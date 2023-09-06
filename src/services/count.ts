import { BaseModel } from "@models";

interface Data {
  id: string;
  count: Number;
}

class CountService {
  model = new BaseModel("count");

  public async getCount(id: string) {
    return await this.model
      .getCollection()
      .findOne({ id: id })
      .then((req) => {
        if (req) {
          return [200, req.count];
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        return [];
      });
  }
}

export default CountService;
