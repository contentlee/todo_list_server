import express, { Express } from "express";
import methodOverride from "method-override";
import dotenv from "dotenv";

import { LoginRoute, TodoRoute, UserRoute } from "@routes";
import { ErrorController } from "@controllers";
import Database from "@libs/database";

class App {
  private app: Express;
  private port = 8080;

  constructor() {
    this.app = express();

    this.initUtils();
    this.initMiddlewares();
    this.initHeaders();
    this.initRoutes();
  }

  initUtils() {
    dotenv.config();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(methodOverride("_method"));
  }

  initHeaders() {
    this.app.use((_, res, next) => {
      res.header("Access-Control-Allow-Origin", process.env.ORIGIN_SUB_DOMAIN);
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

      next();
    });
  }

  initRoutes() {
    const loginRouter = new LoginRoute();
    this.app.use(loginRouter.router);

    const todoRouter = new TodoRoute();
    this.app.use(todoRouter.router);

    this.app.use(ErrorController.log);
    this.app.use(ErrorController.error);
  }

  listen() {
    Database.connect(() => {
      this.app.listen(this.port);
      console.log(`this is port ${this.port}`);
    });
  }
}

export default App;
