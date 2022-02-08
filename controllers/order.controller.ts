import { basketService, orderService, roomService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { GetOrdersDto } from '../shared/dtos'
import { OrderPopulated } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class OrderController {
  async get(req: ModifiedRequest & GetOrdersDto, res: Response) {
    const orders: OrderPopulated[] = await orderService.get(req.query._basket)
    return res.json(orders)
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const { _basket, _room, _services, duty, population, date } = req.body

    const order: OrderPopulated = await orderService.create({
      _basket,
      _room,
      _services,
      duty,
      population,
      date,
    })

    await basketService.addOrder(_basket, order._id)
    await roomService.bookRoom(_room, order._id, population)

    return res.json(order)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const order: OrderPopulated = await orderService.getOne(req.body._id)
    await orderService.delete(req.body._id)
    await basketService.removeOrder(order)
    await roomService.unBookRoom(order._room._id)
    return res.json(order._id)
  }
}
