import { NextFunction, Request, Response } from "express";
import { TodoService } from "@services";

class TodoController {
  private service = new TodoService();

  public getTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .getTodo(req.params.date, req.params.id)
        .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  public getTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .getTodos(req.params.date)
        .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  public createTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .createTodo(req.body)
        .then(() => res.status(201).json({ message: "데이터 생성에 성공하였습니다." }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  public editTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = req.body;
      this.service
        .editTodo(req.params.id, todo)
        .then(() => res.status(200).json({ message: "데이터 변경에 성공하였습니다." }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  public deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .deleteTodo(req.params.id)
        .then(() => res.status(200).json({ message: "데이터 삭제에 성공하였습니다." }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };

  public changeStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .changeStatus(req.url, req.params.id, req.body)
        .then(() => res.status(200).json({ message: "데이터 변경에 성공하였습니다." }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  };
}

export default TodoController;
