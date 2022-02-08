import {
  basketService,
  buildingService,
  orderService,
  reviewService,
  roomService,
} from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { Building, OrderPopulated, RoomPopulated } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class BuildingController {
  async get(req: ModifiedRequest, res: Response) {
    const buildings: Building[] = await buildingService.get()
    return res.json(buildings)
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const building: Building = await buildingService.create(req.body.address)
    return res.json(building)
  }

  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { _id, address } = req.body
    const building: Building = await buildingService.change(_id, address)
    return res.json(building)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await buildingService.delete(req.body._id)
    const rooms: RoomPopulated[] = await roomService.get({ _building: id })

    rooms.map(async (room: RoomPopulated) => {
      if (room._order) {
        const order: OrderPopulated = await orderService.getOne(room._order)
        await orderService.delete(room._order)
        await basketService.removeOrder(order)
      }

      await reviewService.deleteWithRoom(room._id)
    })

    await roomService.deleteWithBuilding(id)
    return res.json(id)
  }
}
