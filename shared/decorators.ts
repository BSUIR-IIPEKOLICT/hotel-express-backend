import { Request, Response } from 'express'
import { Middleware } from './types'

export const errorHandler = (
  _: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const stock = descriptor.value

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: Middleware
  ) {
    try {
      await stock.call(this, req, res)
    } catch (e) {
      return next(e)
    }
  }
}
