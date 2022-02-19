import { orderService, serviceService, typeService } from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { Service } from '../shared/models';
import { auth, errorHandler } from '../shared/decorators';
import { Controller, Delete, Get, Patch, Post } from '../core/decorators';
import { EndPoint, Role, Selector } from '../shared/enums';

@Controller(EndPoint.Services)
export default class ServiceController {
  @Get()
  async get(req: ModifiedRequest, res: Response) {
    const services: Service[] = await serviceService.get();
    return res.json(services);
  }

  @Post()
  @auth(Role.Admin)
  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const { name, price } = req.body;
    const service: Service = await serviceService.create(name, price);
    return res.json(service);
  }

  @Patch(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { name, price } = req.body;
    const service: Service = await serviceService.change(
      req.params.id,
      name,
      price
    );
    return res.json(service);
  }

  @Delete(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await serviceService.delete(req.params.id);
    await typeService.removeService(id);
    await orderService.removeService(id);
    return res.json({ id });
  }
}
