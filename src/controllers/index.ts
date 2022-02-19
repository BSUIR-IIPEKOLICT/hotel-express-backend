import ServiceController from './service.controller';
import BuildingController from './building.controller';
import TypeController from './type.controller';
import RoomController from './room.controller';
import OrderController from './order.controller';
import BasketController from './basket.controller';
import UserController from './user.controller';
import ReviewController from './review.controller';
import { IController } from '../core/types';

export const apiControllers: IController[] = [
  UserController,
  BasketController,
  ReviewController,
  BuildingController,
  OrderController,
  RoomController,
  ServiceController,
  TypeController,
];
