import { ObjectId, WithId } from "mongodb";

export interface BaseTodo {
  title: string;
  content: string;
  place: {
    marker: string;
    name: string;
    lat: number;
    lng: number;
  };
  category: string;
  name: string;
  email: string;
}

export interface PreReqTodo extends BaseTodo {
  date: string;
}

export interface ReqTodo extends BaseTodo {
  date: Date;
  edit_date: Date;
  write_date: Date;
  is_completed: boolean;
  is_held: boolean;
}

export interface ResTodo {
  id: string;
  date: string;
  title: string;
  content: string;
  place: {
    marker: string;
    name: string;
    lat: number;
    lng: number;
  };
  category: string;
  name: string;
  email: string;
  edit_date: string;
  write_date: string;
  is_completed: boolean;
  is_held: boolean;
}

export interface BaseEditTodo {
  title?: string;
  content?: string;
  places?: {
    marker: string;
    name: string;
    lat: number;
    lng: number;
  };
  category?: string;
  name: string;
  email: string;
}
export interface PreReqEditTodo extends BaseEditTodo {
  date?: string;
}
export interface ReqEditTodo extends BaseEditTodo {
  date?: Date;
  edit_date: Date;
}

export interface ReqPlace {
  name: string;
  marker: string;
  lat: number;
  lng: number;
}

export interface Place extends ReqPlace {
  id: number;
}

export interface UserPlace {
  email: string;
  places: Place[];
}

export interface ReqCategory {
  name: string;
}
export interface ResCategory extends ReqCategory {
  id: number;
}
export interface UserCategory {
  email: string;
  category: ResCategory[];
}

export interface Count {
  _id: ObjectId;
  id: string;
  count: number;
}
