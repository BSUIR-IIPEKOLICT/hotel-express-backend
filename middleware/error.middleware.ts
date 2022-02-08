import ApiError from '../errors/api.error'
import { ErrorMessage } from '../shared/enums'
import { Request, Response } from 'express'

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: any
) {
  if (err instanceof ApiError)
    return res.status(err.status).json({ message: err.message })

  return res.status(500).json({ message: ErrorMessage.Unknown })
}
