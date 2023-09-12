import { NextFunction, Request, Response } from "express";
import { LoginService } from "@services";
import { makeExpirationDate } from "@utils/date";

class LoginController {
  private service = new LoginService();
  public login = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .login(req.body)
        .then(({ access_token, refresh_token }) => {
          res
            .status(200)
            .cookie("refresh_token", refresh_token, {
              httpOnly: false,
              expires: makeExpirationDate(7),
            })
            .json({ message: "로그인에 성공하였습니다", access_token });
        })
        .catch(() => {
          res.status(401).json({ message: "로그인에 실패하였습니다." });
        });
    } catch (err) {
      next(err);
    }
  };

  public refreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .refreshToken(req.headers.cookie as string)
        .then((access_token) => {
          res.status(200).json({ message: "토큰 재생성에 성공하였습니다.", access_token });
        })
        .catch(() => {
          res.status(401).json({ message: "로그인이 필요합니다." });
        });
    } catch (err) {
      next(err);
    }
  };
}

export default LoginController;
