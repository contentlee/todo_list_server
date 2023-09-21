import { CategoryModel, PlaceModel, TodoModel, UserModel } from "@models";
import { makeChart } from "@utils/chart";

class UserService {
  private user = new UserModel();
  private todo = new TodoModel();
  private place = new PlaceModel();
  private category = new CategoryModel();

  public async removeUser(email: string) {
    return await this.user
      .removeUser(email)
      .then(async () => {
        await this.todo.removeUserTodo(email);
        await this.place.removeUserPlace(email);
        await this.category.removeUserCategory(email);
      })
      .catch(() => {
        throw new Error("사용자 삭제에 실패하였습니다.");
      });
  }

  public async getUserChartAll(email: string) {
    return await this.todo
      .getUserTodos(email)
      .then((data) => {
        if (data.length) return makeChart(data);
        else return [];
      })
      .catch(() => {
        throw new Error("사용자 통계를 가져오는데 실패하였습니다.");
      });
  }
}

export default UserService;
