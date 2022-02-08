import { basketService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { GetOneBasketDto } from '../shared/dtos'
import { BasketPopulated } from '../shared/models'

export default class BasketController {
  async get(req: ModifiedRequest, res: Response) {
    const baskets: BasketPopulated[] = await basketService.get()
    return res.json(baskets)
  }

  async getOne(req: ModifiedRequest & GetOneBasketDto, res: Response) {
    const basket: BasketPopulated = await basketService.getOne(req.query._user)
    return res.json(basket)
  }
}
