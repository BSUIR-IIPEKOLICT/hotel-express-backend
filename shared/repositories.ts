import {
  BasketModel,
  BuildingModel,
  OrderModel,
  ReviewModel,
  RoomModel,
  ServiceModel,
  TypeModel,
  UserModel,
} from './models'

abstract class Repository<M> {
  public constructor(protected readonly model: M) {
    this.model = model
  }
}

export class BasketRepository extends Repository<BasketModel> {}

export class BuildingRepository extends Repository<BuildingModel> {}

export class OrderRepository extends Repository<OrderModel> {}

export class RoomRepository extends Repository<RoomModel> {}

export class ServiceRepository extends Repository<ServiceModel> {}

export class TypeRepository extends Repository<TypeModel> {}

export class UserRepository extends Repository<UserModel> {}

export class ReviewRepository extends Repository<ReviewModel> {}
