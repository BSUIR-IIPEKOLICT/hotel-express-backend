import { Order, OrderPopulated } from '../shared/models';
import { OrderRepository } from '../shared/repositories';

export default class OrderService extends OrderRepository {
  async getByBasket(_basket: string): Promise<OrderPopulated[]> {
    return this.model
      .find({ _basket })
      .populate('_services')
      .populate('_room')
      .lean();
  }

  async getOnePopulated(_id: string): Promise<OrderPopulated> {
    return this.model
      .findById(_id)
      .populate('_services')
      .populate('_room')
      .lean();
  }

  async create(params: Partial<Order>): Promise<OrderPopulated> {
    const order = await new this.model(params);
    await order.save();
    return this.getOnePopulated(order._id);
  }

  async removeService(serviceId: string) {
    await this.model.updateMany({}, { $pull: { _services: serviceId } });
  }

  async deleteWithBasket(_basket: string) {
    await this.model.deleteMany({ _basket });
  }
}
