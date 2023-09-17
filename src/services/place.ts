import { CountModel, PlaceModel } from "@models";
import { Place, ReqPlace } from "@utils/types";

class PlaceService {
  private place = new PlaceModel();
  private count = new CountModel("place");

  public getPlaces(email: string) {
    return this.place.getPlaces(email);
  }

  public async resisterPlace(place: ReqPlace, email: string) {
    return await this.count.getCount().then(async (data) => {
      if (!data) throw new Error("id값을 찾지 못했습니다.");
      return await this.count
        .increaseCount()
        .then(() => this.place.resisterPlace({ id: data.count + 1, ...place }, email))
        .catch(() => {
          throw new Error("id값 생성에 실패했습니다.");
        });
    });
  }

  public deletePlace(id: string, email: string) {
    return this.place.deletePlace(parseInt(id), email);
  }
}

export default PlaceService;
