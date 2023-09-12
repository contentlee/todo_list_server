import { UserController } from "@controllers";
import BaseRoute from "./base";

class UserRoute extends BaseRoute {
  private controller = new UserController();

  constructor() {
    super();
    this.path = "/user";
    this.route();
  }
}

export default UserRoute;
