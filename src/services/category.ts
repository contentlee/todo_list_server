import { CategoryModel, CountModel } from "@models";
import { ReqCategory } from "@utils/types";

class CategoryService {
  private model = new CategoryModel();
  private count = new CountModel("category");

  public getCategory(email: string) {
    return this.model.getCategory(email);
  }

  public createUserCategory(email: string) {
    return this.model.createUserCategory({ email, category: [] });
  }

  public async resisterCategory(name: string, email: string) {
    return await this.count.getCount().then(async (data) => {
      if (!data) throw new Error("id 값을 찾지 못했습니다");
      return await this.count
        .increaseCount()
        .then(() => this.model.resisterCategory({ id: data.count + 1, name }, email))
        .catch(() => {
          throw new Error("id값 생성에 실패했습니다.");
        });
    });
  }

  public deleteCategory(id: string, email: string) {
    return this.model.deleteCategory(parseInt(id), email);
  }
}

export default CategoryService;
