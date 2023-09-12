import { Document, WithId } from "mongodb";
import BaseModel from "./base";

interface UserInfo {
  name: string;
  email: string;
  refresh_token: string;
  expiration_date: Date;
}

class UserModel {
  private model = new BaseModel("users");

  public getUserByEmail(email: string) {
    return this.model.getCollection().findOne({ email });
  }

  public getUserByToken(refresh_token: string): Promise<WithId<Document> | null> {
    return this.model.getCollection().findOne({ refresh_token });
  }

  public registerToken(info: UserInfo) {
    return this.model.getCollection().insertOne(info);
  }

  public changeToken(email: string, refresh_token: string, expiration_date: Date) {
    return this.model.getCollection().updateOne(
      { email },
      {
        $set: {
          refresh_token,
          expiration_date,
        },
      }
    );
  }
}

export default UserModel;
