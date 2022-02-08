import { orderService, serviceService, typeService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { Service } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class ServiceController {
  async get(req: ModifiedRequest, res: Response) {
    const services: Service[] = await serviceService.get()
    return res.json(services)
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const { name, price } = req.body
    const service: Service = await serviceService.create(name, price)
    return res.json(service)
  }

  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { _id, name, price } = req.body
    const service: Service = await serviceService.change(_id, name, price)
    return res.json(service)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await serviceService.delete(req.body._id)
    await typeService.removeService(id)
    await orderService.removeService(id)
    return res.json(id)
  }
}
