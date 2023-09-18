import { ResCategory, UserCategory } from "@utils/types";
import BaseModel from "./base";

class CategoryModel {
  private model = new BaseModel("category");

  public getCategory(email: string) {
    return this.model.getCollection().findOne({ email });
  }

  public createUserCategory(userCategory: UserCategory) {
    return this.model.getCollection().insertOne(userCategory);
  }

  public resisterCategory(category: ResCategory, email: string) {
    return this.model.getCollection().updateOne({ email }, { $addToSet: { category } });
  }

  public deleteCategory(id: number, email: string) {
    return this.model.getCollection().updateOne({ email }, { $pull: { category: { id } } });
  }

  public removeUserCategory(email: string) {
    return this.model.getCollection().deleteOne({ email });
  }
}

export default CategoryModel;
