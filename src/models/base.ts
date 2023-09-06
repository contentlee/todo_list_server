import Database from "@libs/database";

class BaseModel {
  private collection;

  constructor(collection: string) {
    this.collection = collection;
  }

  getCollection() {
    return Database.db.collection(this.collection);
  }
}

export default BaseModel;
