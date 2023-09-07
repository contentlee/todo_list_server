import { NextFunction, Request, Response } from "express";

class ErrorController {
  static log(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    next();
  }

  static error(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) res.status(500).json({ message: "데이터를 불러오는데 실패했습니다." });
    else res.status(404).json({ message: "잘못된 요청입니다." });
  }
}

export default ErrorController;
