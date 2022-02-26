import { Document, Types } from 'mongoose';

export type Basket = Document & {
  _user: Types.ObjectId;
  _orders: Types.ObjectId[];
};

export type Building = Document & {
  _rooms: Types.ObjectId;
  address: string;
};

export type Order = Document & {
  _basket: Types.ObjectId;
  _room: Types.ObjectId;
  _services: Types.ObjectId[];
  duty: number;
  population: number;
  date: string;
};

export type Room = Document & {
  _building: Types.ObjectId;
  _type: Types.ObjectId;
  _order?: Types.ObjectId;
  isFree: boolean;
  population: number;
};

export type Service = Document & {
  name: string;
  price: number;
};

export type Type = Document & {
  _services: Types.ObjectId[];
  name: string;
  places: number;
};

export type User = Document & {
  email: string;
  password: string;
  role: string;
};

export type Review = Document & {
  _room: Types.ObjectId;
  author: string;
  content: string;
};

export type BasketPopulated = Document & {
  _user: User;
  _orders: Order[];
};

export type BuildingPopulated = Document & {
  _rooms: Room[];
  address: string;
};

export type OrderPopulated = Document & {
  _basket: Types.ObjectId;
  _room: Room;
  _services: Service[];
  duty: number;
  population: number;
  date: string;
};

export type RoomPopulated = Document & {
  _building: Building;
  _type: Type;
  _order?: string;
  isFree: boolean;
  population: number;
};
