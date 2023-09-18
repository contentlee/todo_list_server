import { BaseModel } from "@models";
import { ReqEditTodo, ReqTodo } from "@utils/types";

class TodoModel {
  private model = new BaseModel("todo");

  public getTodo(startDate: Date, endDate: Date, id: number, email: string) {
    return this.model.getCollection().findOne({ date: { $gte: startDate, $lt: endDate }, id, email });
  }

  public getTodos(startDate: Date, endDate: Date, email: string) {
    return this.model
      .getCollection()
      .find({ date: { $gte: startDate, $lt: endDate }, email })
      .toArray();
  }

  public createTodo(id: number, todo: ReqTodo) {
    return this.model.getCollection().insertOne({ id, ...todo });
  }

  public completeTodo(id: number, isCompleted: boolean, email: string) {
    return this.model.getCollection().updateOne(
      { id, email },
      {
        $set: {
          is_completed: isCompleted,
          is_held: false,
        },
      }
    );
  }

  public holdTodo(id: number, isHeld: boolean, email: string) {
    return this.model.getCollection().updateOne(
      { id, email },
      {
        $set: {
          is_completed: false,
          is_held: isHeld,
        },
      }
    );
  }

  public editTodo(id: number, todo: ReqEditTodo) {
    return this.model.getCollection().updateOne({ id, email: todo.email }, { $set: { ...todo } });
  }

  public deleteTodo(id: number, email: string) {
    return this.model.getCollection().deleteOne({ id, email });
  }

  public removeUserTodo(email: string) {
    return this.model.getCollection().deleteMany({ email });
  }
}

export default TodoModel;
