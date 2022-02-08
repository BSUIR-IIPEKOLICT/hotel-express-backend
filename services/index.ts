import BasketService from './basket.service'
import BuildingService from './building.service'
import OrderService from './order.service'
import RoomService from './room.service'
import ServiceService from './service.service'
import TypeService from './type.service'
import UserService from './user.service'
import {
  basketModel,
  buildingModel,
  orderModel,
  roomModel,
  userModel,
  serviceModel,
  typeModel,
  reviewModel,
} from '../models'
import ReviewService from './review.service'

export const basketService = new BasketService(basketModel)
export const buildingService = new BuildingService(buildingModel)
export const orderService = new OrderService(orderModel)
export const roomService = new RoomService(roomModel)
export const serviceService = new ServiceService(serviceModel)
export const typeService = new TypeService(typeModel)
export const userService = new UserService(userModel)
export const reviewService = new ReviewService(reviewModel)
