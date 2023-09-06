import { NextFunction, Request, Response } from "express";
import { TodoService } from "@services";

class TodoController {
  private service = new TodoService();

  public getTodo = (req: Request, res: Response, next: NextFunction) => {
    console.log(this);
    try {
      const data = this.service.getTodo(req.params.id);
      res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data });
    } catch (err) {
      console.log(err);
    }
  };

  public getTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.service.getTodos(req.params.date);
      res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data });
    } catch (err) {
      console.log(err);
    }
  };

  public createTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = req.body;
      res.status(201).json({ message: "데이터 생성에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  public editTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = req.body;
      this.service.editTodo(req.params.id, todo);
      res.status(200).json({ message: "데이터 수정에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  public deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service.deleteTodo(req.params.id);
      res.status(200).json({ message: "데이터 삭제에 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
