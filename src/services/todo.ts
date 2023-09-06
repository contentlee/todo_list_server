import "module-alias/register";

import { ObjectId } from "mongodb";
import { BaseModel } from "@models";

interface Todo {
  date: string;
  title: string;
  content: string;
  place: {
    marker: string;
    name: string;
    lat: number;
    lng: number;
  };
  category: string;
  isCompleted: boolean;
  isHeld: boolean;
  writeDate: string;
  editDate: string;
}

class TodoService {
  private model = new BaseModel("todo");

  public getTodo(id: string) {
    return this.model.getCollection().findOne({ id: parseInt(id) });
  }

  public getTodos(date: string) {
    return this.model.getCollection().find({ date: date });
  }

  public createTodo(id: Number, todo: Todo) {
    return this.model.getCollection().insertOne({ id, ...todo });
  }

  public completeTodo(id: string, isCompleted: boolean) {
    return this.model.getCollection().updateOne(
      { id: parseInt(id) },
      {
        $set: {
          is_completed: isCompleted,
        },
      }
    );
  }

  public holdTodo(id: string, isHeld: boolean) {
    return this.model.getCollection().updateOne(
      { id: parseInt(id) },
      {
        $set: {
          is_held: isHeld,
        },
      }
    );
  }

  public editTodo(id: string, todo: Todo) {
    return this.model.getCollection().updateOne({ id: parseInt(id) }, { $set: { edit_date: new Date() } });
  }

  public deleteTodo(id: string) {
    return this.model.getCollection().deleteOne({ _id: new ObjectId(id) });
  }
}

export default TodoService;
