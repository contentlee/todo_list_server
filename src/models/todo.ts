import { BaseModel } from "@models";
import { OptionalTodo, ReqTodo } from "@utils/types";

class TodoModel {
  private model = new BaseModel("todo");

  public getTodo(startDate: Date, endDate: Date, id: number) {
    return this.model.getCollection().findOne({ date: { $gte: startDate, $lt: endDate }, id });
  }

  public getTodos(startDate: Date, endDate: Date) {
    return this.model
      .getCollection()
      .find({ date: { $gte: startDate, $lt: endDate } })
      .toArray();
  }

  public createTodo(id: number, todo: ReqTodo) {
    return this.model.getCollection().insertOne({ id, ...todo });
  }

  public completeTodo(id: number, isCompleted: boolean) {
    return this.model.getCollection().updateOne(
      { id },
      {
        $set: {
          is_completed: isCompleted,
          is_held: false,
        },
      }
    );
  }

  public holdTodo(id: number, isHeld: boolean) {
    return this.model.getCollection().updateOne(
      { id },
      {
        $set: {
          is_completed: false,
          is_held: isHeld,
        },
      }
    );
  }

  public editTodo(id: number, todo: OptionalTodo) {
    return this.model.getCollection().updateOne({ id }, { $set: { ...todo } });
  }

  public deleteTodo(id: number) {
    return this.model.getCollection().deleteOne({ id });
  }
}

export default TodoModel;
