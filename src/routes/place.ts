import { PlaceController } from "@controllers";
import BaseRoute from "./base";

class PlaceRoute extends BaseRoute {
  private controller = new PlaceController();

  constructor() {
    super();
    this.path = "/place";
    this.isAuth = true;
    this.routes = [
      ["get", "/", [this.controller.getPlaces]],
      ["post", "/add", [this.controller.resisterPlace]],
      ["delete", "/delete/:id", [this.controller.deletePlace]],
    ];

    this.route();
  }
}

export default PlaceRoute;
