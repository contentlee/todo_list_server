import { PlaceService } from "@services";
import { NextFunction, Request, Response } from "express";

class PlaceController {
  private service = new PlaceService();

  public getPlaces = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .getPlaces(req.body.email)
        .then((data) => res.status(200).json({ message: "데이터를 가져오는데 성공하였습니다.", data }))
        .catch(() => res.status(403).json({ message: "데이터를 가져오는데 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };

  public resisterPlace = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .resisterPlace(req.body.place, req.body.email)
        .then(() => res.status(200).json({ message: "데이터 생성에 성공하였습니다." }))
        .catch(() => res.status(403).json({ message: "데이터 생성에 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };

  public deletePlace = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.service
        .deletePlace(req.params.id, req.body.email)
        .then(() => res.status(200).json({ message: "데이터 삭제에 성공하였습니다." }))
        .catch(() => res.status(403).json({ message: "데이터 삭제에 실패하였습니다." }));
    } catch (err) {
      next(err);
    }
  };
}

export default PlaceController;
