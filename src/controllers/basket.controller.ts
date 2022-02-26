import { basketService } from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { GetOneBasketDto } from '../shared/dtos';
import { BasketPopulated } from '../shared/models';
import { Controller, Get } from '../core/decorators';
import { EndPoint, Role } from '../shared/enums';
import { auth, safeCall } from '../shared/decorators';
import { ApiError } from '../helpers';
import { BaseController } from '../core/abstractions';

@Controller(EndPoint.Baskets)
export default class BasketController extends BaseController {
  @Get()
  @auth(Role.Admin)
  async get(req: ModifiedRequest, res: Response) {
    const baskets: BasketPopulated[] = await basketService.getAllPopulated();
    return res.json(baskets);
  }

  @Get(EndPoint.Current)
  @safeCall(ApiError.notFound())
  async getOne(req: ModifiedRequest & GetOneBasketDto, res: Response) {
    const basket: BasketPopulated = await basketService.getOnePopulated(
      req.query._user
    );
    return res.json(basket);
  }
}
