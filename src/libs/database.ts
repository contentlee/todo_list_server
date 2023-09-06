import { Db, MongoClient } from "mongodb";

class Database {
  static db: Db;

  static async connect(callback: () => void) {
    await MongoClient.connect(process.env.MONGO_URI as string)
      .then((client) => {
        Database.db = client.db("todo");
        callback();
      })
      .catch((err) => console.log(err));
  }
}

export default Database;
