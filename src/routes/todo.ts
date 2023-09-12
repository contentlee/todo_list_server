import { TodoController } from "@controllers";
import BaseRoute from "./base";

class TodoRoute extends BaseRoute {
  private controller = new TodoController();

  constructor() {
    super();
    this.path = "/todo";
    this.isAuth = true;
    this.routes = [
      ["get", "/:date/:id", [this.controller.getTodo]],
      ["get", "/:date", [this.controller.getTodos]],
      ["post", "/add", [this.controller.createTodo]],
      ["patch", "/:id", [this.controller.editTodo]],
      ["patch", "/hold/:id", [this.controller.changeStatus]],
      ["patch", "/complete/:id", [this.controller.changeStatus]],
      ["delete", "/:id", [this.controller.deleteTodo]],
    ];

    this.route();
  }
}

export default TodoRoute;
