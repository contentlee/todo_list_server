import { Place, UserPlace } from "@utils/types";
import BaseModel from "./base";

class PlaceModel {
  private model = new BaseModel("place");

  public getPlaces(email: string) {
    return this.model.getCollection().findOne({ email });
  }

  public createUserPlace(userPlace: UserPlace) {
    return this.model.getCollection().insertOne(userPlace);
  }

  public removeUserPlace(email: string) {
    return this.model.getCollection().deleteOne({ email });
  }

  public resisterPlace(place: Place, email: string) {
    return this.model.getCollection().updateOne({ email }, { $addToSet: { places: place } });
  }

  public deletePlace(id: number, email: string) {
    return this.model.getCollection().updateOne({ email }, { $pull: { places: { id } } });
  }
}

export default PlaceModel;
