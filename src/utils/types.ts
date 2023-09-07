import { ObjectId } from "mongodb";

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
  is_completed: boolean;
  is_held: boolean;
}

export interface PreReqTodo extends BaseTodo {
  date: string;
}

export interface ReqTodo extends BaseTodo {
  date: Date;
  edit_date: Date;
  write_date: Date;
}

export interface PreOptionalTodo {
  date?: Date;
  title?: string;
  content?: string;
  place?: {
    marker: string;
    name: string;
    lat: number;
    lng: number;
  };
  category?: string;
  is_completed?: boolean;
  is_held?: boolean;
}

export interface OptionalTodo {
  edit_date: Date;
}

export interface Count {
  _id: ObjectId;
  id: string;
  count: number;
}
