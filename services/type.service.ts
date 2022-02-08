import { TypeRepository } from '../shared/repositories'
import { Type } from '../shared/models'

export default class TypeService extends TypeRepository {
  async get(): Promise<Type[]> {
    return this.model.find({}).lean()
  }

  async create(
    _services: string[],
    name: string,
    places: number
  ): Promise<Type> {
    const type = await new this.model({
      _services,
      name,
      places,
    })
    await type.save()
    return type
  }

  async change(
    _id: string,
    _services: string[],
    name: string,
    places: number
  ): Promise<Type> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { _services, name, places },
      })
      .lean()
    return this.model.findById(_id).lean()
  }

  async removeService(serviceId: string) {
    await this.model.updateMany({}, { $pull: { _services: serviceId } })
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id)
    return _id
  }
}
