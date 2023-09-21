import Database from "@libs/database";
import { Document } from "mongodb";

class BaseModel {
  private collection;

  constructor(collection: string) {
    this.collection = collection;
  }

  getCollection<T extends Document>() {
    return Database.db.collection<T>(this.collection);
  }
}

export default BaseModel;
