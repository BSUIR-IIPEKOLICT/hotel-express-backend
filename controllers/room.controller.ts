import {
  basketService,
  buildingService,
  orderService,
  reviewService,
  roomService,
} from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { GetRoomsDto } from '../shared/dtos'
import { IQuery } from '../shared/interfaces'
import { OrderPopulated, RoomPopulated } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class RoomController {
  async get(req: ModifiedRequest & GetRoomsDto, res: Response) {
    let { _building, _type, page, limit, isFree } = req.query

    if (typeof page === 'string') {
      page = parseInt(page) || 1
    }

    if (typeof limit === 'string') {
      limit = parseInt(limit) || 20
    }

    const offset: number = page * limit - limit
    const query: IQuery = {}

    if (isFree) {
      query.isFree = isFree === 'true'
    }

    if (_building && !_type) query._building = _building
    else if (!_building && _type) query._type = _type
    else if (_building && _type) {
      query._building = _building
      query._type = _type
    }

    const amount: number = await roomService.getAmount(query)
    const rooms: RoomPopulated[] = await roomService.get(query, limit, offset)

    return res.json({ rooms, amount })
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const room: RoomPopulated = await roomService.create(
      req.body._building,
      req.body._type
    )
    await buildingService.addRoom(req.body._building, room._id)
    return res.json(room)
  }

  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { _id, _building, _type } = req.body
    const stock: RoomPopulated = await roomService.getOne(_id)
    const room: RoomPopulated = await roomService.change(_id, _building, _type)

    if (_building !== stock._building._id) {
      await buildingService.removeRoom(_id)
      await buildingService.addRoom(_building, _id)
    }

    return res.json(room)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const room: RoomPopulated = await roomService.getOne(req.body._id)
    await roomService.delete(room._id)
    await buildingService.removeRoom(room._id)
    await reviewService.deleteWithRoom(room._id)

    if (room._order) {
      const order: OrderPopulated = await orderService.getOne(room._order)
      await orderService.delete(room._order)
      await basketService.removeOrder(order._id)
    }

    return res.json(room._id)
  }
}
