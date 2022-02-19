import { basketService } from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { GetOneBasketDto } from '../shared/dtos';
import { BasketPopulated } from '../shared/models';
import { Controller, Get } from '../core/decorators';
import { EndPoint, Role } from '../shared/enums';
import { auth } from '../shared/decorators';

@Controller(EndPoint.Baskets)
export default class BasketController {
  @Get()
  @auth(Role.Admin)
  async get(req: ModifiedRequest, res: Response) {
    const baskets: BasketPopulated[] = await basketService.get();
    return res.json(baskets);
  }

  @Get(EndPoint.Current)
  async getOne(req: ModifiedRequest & GetOneBasketDto, res: Response) {
    const basket: BasketPopulated = await basketService.getOne(req.query._user);
    return res.json(basket);
  }
}
