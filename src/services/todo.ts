import { CountModel, TodoModel } from "@models";
import { makeOneDay } from "@utils/date";
import { PreOptionalTodo, PreReqTodo } from "@utils/types";

class TodoService {
  todo = new TodoModel();
  count = new CountModel("todo_count");

  public getTodo(date: string, id: string) {
    const [startDate, endDate] = makeOneDay(date);
    return this.todo.getTodo(startDate, endDate, parseInt(id));
  }

  public getTodos(date: string) {
    const [startDate, endDate] = makeOneDay(date);
    return this.todo.getTodos(startDate, endDate);
  }

  public async createTodo(todo: PreReqTodo) {
    const date = new Date(todo.date);
    const tmp = {
      ...todo,
      date,
      edit_date: new Date(),
      write_date: new Date(),
    };

    return await this.count
      .getCount()
      .then(async (data) => {
        if (!data) throw new Error("id값을 찾지 못했습니다.");
        return await this.count
          .increaseCount()
          .then(() => this.todo.createTodo(data.count + 1, tmp))
          .catch(() => {
            throw new Error("id값 생성에 실패했습니다.");
          });
      })
      .catch(() => {
        throw new Error("id값을 찾지 못했습니다.");
      });
  }

  public editTodo(id: string, todo: PreOptionalTodo) {
    const tmp = {
      edit_date: new Date(),
      ...todo,
    };

    return this.todo.editTodo(parseInt(id), tmp);
  }

  public deleteTodo(id: string) {
    return this.todo.deleteTodo(parseInt(id));
  }

  public changeStatus(url: string, id: string, val: boolean) {
    const cond = url.split("/")[0];
    if (cond === "hold") {
      return this.todo.holdTodo(parseInt(id), val);
    } else {
      return this.todo.completeTodo(parseInt(id), val);
    }
  }
}

export default TodoService;
