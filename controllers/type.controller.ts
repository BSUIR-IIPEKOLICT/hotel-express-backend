import {
  basketService,
  buildingService,
  orderService,
  reviewService,
  roomService,
  typeService,
} from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { OrderPopulated, RoomPopulated, Type } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class TypeController {
  async get(req: ModifiedRequest, res: Response) {
    const types: Type[] = await typeService.get()
    return res.json(types)
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const { _services, name, places } = req.body
    const type: Type = await typeService.create(_services, name, places)
    return res.json(type)
  }

  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { _id, _services, name, places } = req.body
    const type: Type = await typeService.change(_id, _services, name, places)
    return res.json(type)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await typeService.delete(req.body._id)
    const rooms: RoomPopulated[] = await roomService.get({ _type: id })
    await roomService.deleteWithType(id)

    rooms.map(async (room: RoomPopulated) => {
      await reviewService.deleteWithRoom(room._id)
      await buildingService.removeRoom(room._id)

      if (room._order) {
        const order: OrderPopulated = await orderService.getOne(room._order)
        await basketService.removeOrder(order)
        await orderService.delete(room._order)
      }
    })

    return res.json(id)
  }
}
