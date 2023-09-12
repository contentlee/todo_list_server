import { CountModel, TodoModel } from "@models";
import { makeOneDay, setStringToDate } from "@utils/date";
import { PreReqEditTodo, PreReqTodo } from "@utils/types";

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
    const date = setStringToDate(todo.date);
    const tmp = {
      ...todo,
      date,
      is_held: false,
      is_completed: false,
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

  public editTodo(id: string, todo: PreReqEditTodo) {
    const tmp: any = {
      edit_date: new Date(),
      ...todo,
    };
    if (tmp.date) tmp.date = setStringToDate(tmp.date);

    return this.todo.editTodo(parseInt(id), tmp);
  }

  public deleteTodo(id: string) {
    return this.todo.deleteTodo(parseInt(id));
  }

  public changeStatus(url: string, id: string, body: { val: boolean }) {
    const cond = url.split("/")[0];
    if (cond === "hold") {
      return this.todo.holdTodo(parseInt(id), body.val);
    } else {
      return this.todo.completeTodo(parseInt(id), body.val);
    }
  }
}

export default TodoService;
