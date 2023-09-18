import { UserController } from "@controllers";
import BaseRoute from "./base";

class UserRoute extends BaseRoute {
  private controller = new UserController();

  constructor() {
    super();
    this.path = "/user";
    this.isAuth = true;
    this.routes = [["delete", "/remove", [this.controller.removeUser]]];
    this.route();
  }
}

export default UserRoute;
