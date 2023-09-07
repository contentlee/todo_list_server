import { BaseModel } from "@models";

class CountModel {
  private model = new BaseModel("count");
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  public async getCount() {
    return await this.model.getCollection().findOne({ id: this.id });
  }

  public async increaseCount() {
    return await this.model.getCollection().updateOne({ id: this.id }, { $inc: { count: 1 } });
  }
}

export default CountModel;
