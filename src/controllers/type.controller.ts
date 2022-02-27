import {
  basketService,
  buildingService,
  orderService,
  reviewService,
  roomService,
  typeService,
} from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { OrderPopulated, RoomPopulated, Type } from '../shared/models';
import { auth, safeCall } from '../shared/decorators';
import { EndPoint, Role, Selector } from '../shared/enums';
import { Controller, Delete, Get, Post, Put } from '../core/decorators';
import { BaseController } from '../core/abstractions';

@Controller(EndPoint.Types)
export default class TypeController extends BaseController {
  @Get()
  async getAll(req: ModifiedRequest, res: Response) {
    const types: Type[] = await typeService.getAll();
    return res.json(types);
  }

  @Post()
  @auth(Role.Admin)
  @safeCall()
  async create(req: ModifiedRequest, res: Response) {
    const { _services, name, places } = req.body;
    const type: Type = await typeService.create(_services, name, places);
    return res.json(type);
  }

  @Put(Selector.Id)
  @auth(Role.Admin)
  @safeCall()
  async change(req: ModifiedRequest, res: Response) {
    const { _services, name, places } = req.body;
    const type: Type = await typeService.change(
      req.params.id,
      _services,
      name,
      places
    );
    return res.json(type);
  }

  @Delete(Selector.Id)
  @auth(Role.Admin)
  @safeCall()
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await typeService.delete(req.params._id);
    const rooms: RoomPopulated[] = await roomService.get({ _type: id });
    await roomService.deleteWithType(id);

    rooms.map(async (room: RoomPopulated) => {
      await reviewService.deleteWithRoom(room._id);
      await buildingService.removeRoom(room._id);

      if (room._order) {
        const order: OrderPopulated = await orderService.getOnePopulated(
          room._order
        );
        await basketService.removeOrder(order);
        await orderService.delete(room._order);
      }
    });

    return res.json({ id });
  }
}
