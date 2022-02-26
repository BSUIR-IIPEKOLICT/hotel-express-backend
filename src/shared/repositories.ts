import {
  Basket,
  Building,
  Order,
  Review,
  Room,
  Service,
  Type,
  User,
} from './models';
import { Model } from 'mongoose';

abstract class Repository<M> {
  constructor(protected readonly model: Model<M>) {
    this.model = model;
  }

  async getAll(): Promise<M[]> {
    return this.model.find({}).lean();
  }

  async getOne(_id: string): Promise<M> {
    return this.model.findById(_id).lean();
  }

  async count(): Promise<number> {
    return this.model.countDocuments();
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id);
    return _id;
  }
}

export class BasketRepository extends Repository<Basket> {}

export class BuildingRepository extends Repository<Building> {}

export class OrderRepository extends Repository<Order> {}

export class ReviewRepository extends Repository<Review> {}

export class RoomRepository extends Repository<Room> {}

export class ServiceRepository extends Repository<Service> {}

export class TypeRepository extends Repository<Type> {}

export class UserRepository extends Repository<User> {}
