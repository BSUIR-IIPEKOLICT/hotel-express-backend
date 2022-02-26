import { ServiceRepository } from '../shared/repositories';
import { Service } from '../shared/models';

export default class ServiceService extends ServiceRepository {
  async create(name: string, price: number): Promise<Service> {
    const service = await new this.model({ name, price });
    await service.save();
    return service;
  }

  async change(_id: string, name: string, price: number): Promise<Service> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { name, price },
      })
      .lean();
    return this.model.findById(_id).lean();
  }
}
