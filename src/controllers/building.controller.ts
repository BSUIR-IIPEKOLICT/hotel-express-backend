import {
  basketService,
  buildingService,
  orderService,
  reviewService,
  roomService,
} from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { Building, OrderPopulated, RoomPopulated } from '../shared/models';
import { auth, errorHandler } from '../shared/decorators';
import { Controller, Delete, Get, Patch, Post } from '../core/decorators';
import { EndPoint, Selector } from '../shared/enums';
import { Role } from '../shared/enums';

@Controller(EndPoint.Buildings)
export default class BuildingController {
  @Get()
  async get(req: ModifiedRequest, res: Response) {
    const buildings: Building[] = await buildingService.get();
    return res.json(buildings);
  }

  @Post()
  @auth(Role.Admin)
  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const building: Building = await buildingService.create(req.body.address);
    return res.json(building);
  }

  @Patch(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const building: Building = await buildingService.change(
      req.params.id,
      req.body.address
    );
    return res.json(building);
  }

  @Delete(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await buildingService.delete(req.params.id);
    const rooms: RoomPopulated[] = await roomService.get({ _building: id });

    rooms.map(async (room: RoomPopulated) => {
      if (room._order) {
        const order: OrderPopulated = await orderService.getOne(room._order);
        await orderService.delete(room._order);
        await basketService.removeOrder(order);
      }

      await reviewService.deleteWithRoom(room._id);
    });

    await roomService.deleteWithBuilding(id);
    return res.json({ id });
  }
}
