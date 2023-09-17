import { google } from "googleapis";
import axios from "axios";

import { PlaceModel, UserModel } from "@models";
import { makeExpirationDate } from "@utils/date";

class LoginService {
  private user = new UserModel();
  private place = new PlaceModel();

  private oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
  );

  public async login({ credential }: { credential: string }) {
    const {
      tokens: { access_token, refresh_token },
    } = await this.oauth2Client.getToken(credential);

    const {
      data: { email, name },
    } = await this.getUserInfo(access_token!);
    const tmp_refresh_token = refresh_token?.split("//")[1];

    const userInfo = await this.user.getUserByEmail(email);
    if (userInfo) await this.user.changeToken(email, tmp_refresh_token!, makeExpirationDate(7));
    else {
      await this.user.registerToken({
        name,
        email,
        refresh_token: tmp_refresh_token!,
        expiration_date: makeExpirationDate(7),
      });

      await this.place.createUserPlace({ email, places: [] });
    }

    return { access_token, refresh_token: tmp_refresh_token };
  }

  public async refreshToken(cookie: string) {
    const refresh_token = cookie.split("=")[1];

    if (refresh_token) {
      return this.authRefresh(refresh_token)
        .then(async (isPossible) => {
          if (isPossible) {
            this.oauth2Client.setCredentials({ refresh_token: "1//" + refresh_token });
            const {
              credentials: { access_token },
            } = await this.oauth2Client.refreshAccessToken();

            return access_token;
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          throw new Error();
        });
    } else {
      throw new Error();
    }
  }

  private async authRefresh(refresh_token: string): Promise<boolean> {
    const userInfo = await this.user.getUserByToken(refresh_token);
    if (userInfo) {
      const expiration_date = new Date(userInfo["expiration_date"]);
      const today = new Date();

      return expiration_date.getTime() > today.getTime();
    }

    return false;
  }

  private async getUserInfo(access_token: string) {
    const oauthGoogleUrlAPI = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=";
    return await axios.get(oauthGoogleUrlAPI + access_token);
  }
}

export default LoginService;
