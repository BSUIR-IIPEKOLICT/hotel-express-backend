import ServiceController from './service.controller'
import BuildingController from './building.controller'
import TypeController from './type.controller'
import RoomController from './room.controller'
import OrderController from './order.controller'
import BasketController from './basket.controller'
import UserController from './user.controller'
import ReviewController from './review.controller'

export const buildingController = new BuildingController()
export const serviceController = new ServiceController()
export const typeController = new TypeController()
export const roomController = new RoomController()
export const orderController = new OrderController()
export const basketController = new BasketController()
export const userController = new UserController()
export const reviewController = new ReviewController()
