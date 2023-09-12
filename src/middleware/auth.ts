import axios from "axios";
import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  public authAccess = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const access_token = req.headers.authorization.split(" ")[1];
      const oauthGoogleUrlAPI = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=";
      await axios
        .get(oauthGoogleUrlAPI + access_token)
        .then((res) => {
          req.body.name = res.data.name;
          req.body.email = res.data.email;
          next();
        })
        .catch(() => {
          res.status(403).json({ message: "토큰이 만료되었습니다." });
        });
    } else {
      res.status(401).json({ message: "토큰이 존재하지 않습니다." });
    }
  };
}

export default AuthMiddleware;
