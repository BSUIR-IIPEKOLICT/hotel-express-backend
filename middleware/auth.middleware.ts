import internalMiddleware from './internal.middleware'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'

export default function authMiddleware(
  req: ModifiedRequest,
  res: Response,
  next
) {
  return internalMiddleware(req, res, next)
}
