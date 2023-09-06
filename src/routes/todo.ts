import BaseRoute from "./base";
import { TodoController } from "@controllers";

class TodoRoute extends BaseRoute {
  private controller = new TodoController();

  constructor() {
    super();
    this.path = "/todo";
    this.routes = [
      ["get", "/:date/:id", this.controller.getTodo],
      ["get", "/:date", this.controller.getTodos],
      ["post", "/", this.controller.createTodo],
      ["patch", "/:id", this.controller.editTodo],
      ["delete", "/:id", this.controller.deleteTodo],
    ];

    this.route();
  }
}

export default TodoRoute;
