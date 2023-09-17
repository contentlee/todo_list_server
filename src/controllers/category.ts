import { CategoryService } from "@services";
import { NextFunction, Request, Response } from "express";

class CategoryController {
  private service = new CategoryService();

  public getCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .getCategory(req.body.email)
        .then((data) => {
          res.status(200).json({ message: "데이터를 불러오는데 성공하였습니다.", data });
        })
        .catch(() => res.status(403).json({ message: "데이터를 불러오는데 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };

  public resisterCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .resisterCategory(req.body.category, req.body.email)
        .then(() => res.status(200).json({ message: "데이터 생성에 성공하였습니다." }))
        .catch(() => res.status(403).json({ message: "데이터를 생성하는데 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };

  public deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .deleteCategory(req.params.id, req.body.email)
        .then(() => res.status(200).json({ message: "데이터를 삭제하는데 성공하였습니다." }))
        .catch(() => res.status(403).json({ message: "데이터를 삭제하는데 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };
}

export default CategoryController;
