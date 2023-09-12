import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { AuthMiddleware } from "@middleware";

export type TRoute = [
  "get" | "post" | "patch" | "delete",
  string,
  ((req: Request, res: Response, next: NextFunction) => Promise<any> | void)[]
];

class BaseRoute {
  private auth = new AuthMiddleware();

  public router = Router();
  protected routes: TRoute[] = [];
  protected path = "";
  protected isAuth = false;

  protected initializeRoutes([method, url, ...controller]: TRoute) {
    if (this.isAuth) this.router[method](this.path + url, this.auth.authAccess, ...controller);
    else this.router[method](this.path + url, ...controller);
  }

  protected route() {
    this.routes.forEach((route) => {
      this.initializeRoutes(route);
    });
  }
}

export default BaseRoute;
