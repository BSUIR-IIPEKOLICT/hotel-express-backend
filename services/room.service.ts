import { RoomPopulated } from '../shared/models'
import { RoomRepository } from '../shared/repositories'
import { IQuery } from '../shared/interfaces'

export default class RoomService extends RoomRepository {
  async get(
    query: IQuery,
    limit: number = Number.MAX_SAFE_INTEGER,
    offset: number = 0
  ): Promise<RoomPopulated[]> {
    return this.model
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate('_type')
      .populate('_building')
      .lean()
  }

  async getOne(_id: string): Promise<RoomPopulated> {
    return this.model
      .findById(_id)
      .populate('_type')
      .populate('_building')
      .lean()
  }

  async getAmount(query: IQuery): Promise<number> {
    return this.model.find(query).countDocuments()
  }

  async create(_building: string, _type: string): Promise<RoomPopulated> {
    const room = await new this.model({
      _building,
      _type,
      isFree: true,
      population: 0,
    })
    await room.save()
    return this.getOne(room._id)
  }

  async change(
    _id: string,
    _building: string,
    _type: string
  ): Promise<RoomPopulated> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { _building, _type },
      })
      .lean()
    return this.getOne(_id)
  }

  async bookRoom(roomId: string, orderId: string, population: number) {
    await this.model.findByIdAndUpdate(roomId, {
      $set: { _order: orderId, isFree: false, population },
    })
  }

  async unBookRoom(roomId: string) {
    await this.model.findByIdAndUpdate(roomId, {
      $set: { isFree: true, population: 0 },
    })
    await this.model.findByIdAndUpdate(roomId, { $unset: { _order: '' } })
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithBuilding(_building: string) {
    await this.model.deleteMany({ _building })
  }

  async deleteWithType(_type: string) {
    await this.model.deleteMany({ _type })
  }
}
