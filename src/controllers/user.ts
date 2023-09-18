import { UserService } from "@services";
import { NextFunction, Request, Response } from "express";

class UserController {
  private service = new UserService();

  public removeUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .removeUser(req.body.email)
        .then(() => {
          res.status(200).clearCookie("refresh_token").json({ message: "유저의 사용내역을 모두 삭제하였습니다." });
        })
        .catch(() => res.status(403).json({ message: "요청이 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
