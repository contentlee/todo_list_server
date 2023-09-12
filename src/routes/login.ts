import { LoginController } from "@controllers";
import BaseRoute from "./base";

class LoginRoute extends BaseRoute {
  private controller = new LoginController();

  constructor() {
    super();
    this.path = "/login";
    this.routes = [
      ["post", "/", [this.controller.login]],
      ["post", "/refresh", [this.controller.refreshToken]],
    ];
    this.route();
  }
}

export default LoginRoute;
