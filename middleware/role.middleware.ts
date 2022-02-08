import internalMiddleware from './internal.middleware'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'

export default function roleMiddleware(roles: string[]) {
  return (req: ModifiedRequest, res: Response, next) =>
    internalMiddleware(req, res, next, roles)
}
