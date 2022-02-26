import { BasketPopulated, OrderPopulated } from '../shared/models';
import { BasketRepository } from '../shared/repositories';

export default class BasketService extends BasketRepository {
  async getAllPopulated(): Promise<BasketPopulated[]> {
    return this.model.find({}).populate('_user').populate('_orders').lean();
  }

  async getOnePopulated(_user: string): Promise<BasketPopulated> {
    return this.model
      .findOne({ _user })
      .populate('_user')
      .populate('_orders')
      .lean();
  }

  async create(_user: string): Promise<BasketPopulated> {
    const basket = await new this.model({ _user });
    await basket.save();
    return this.getOnePopulated(_user);
  }

  async addOrder(basketId: string, orderId: string) {
    await this.model.findByIdAndUpdate(basketId, {
      $push: { _orders: orderId },
    });
  }

  async removeOrder(order: OrderPopulated) {
    await this.model.updateOne(
      { _id: order._basket },
      { $pull: { _orders: order._id } }
    );
  }
}
