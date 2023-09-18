import { CategoryModel, PlaceModel, TodoModel, UserModel } from "@models";

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
}

export default UserService;
