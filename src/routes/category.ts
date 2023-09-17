import CategoryController from "src/controllers/category";
import BaseRoute from "./base";

class CategoryRoute extends BaseRoute {
  private controller = new CategoryController();

  constructor() {
    super();
    this.path = "/category";
    this.isAuth = true;
    this.routes = [
      ["get", "/", [this.controller.getCategory]],
      ["post", "/add", [this.controller.resisterCategory]],
      ["delete", "/delete/:id", [this.controller.deleteCategory]],
    ];

    this.route();
  }
}

export default CategoryRoute;
