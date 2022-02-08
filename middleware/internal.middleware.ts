import ApiError from '../errors/api.error'
import jwt from 'jsonwebtoken'
import { LOCAL_JWT_SECRET } from '../shared/constants'
import { Response } from 'express'
import { ErrorMessage } from '../shared/enums'
import { ModifiedRequest, UserToken } from '../shared/types'

const secret: string = process.env.JWT_SECRET || LOCAL_JWT_SECRET

export default function internalMiddleware(
  req: ModifiedRequest,
  res: Response,
  next,
  roles?: String[]
) {
  if (req.method === 'OPTIONS') return next()

  try {
    const token: string = req.headers.authorization.split(' ')[1]

    if (!token) return next(ApiError.authError(ErrorMessage.Auth))

    const decoded: UserToken = jwt.verify<UserToken>(token, secret)

    if (roles && !roles.includes(decoded.role)) {
      return next(ApiError.forbidden(ErrorMessage.Access))
    }

    req.user = decoded
    next()
  } catch (e) {
    next(ApiError.authError(ErrorMessage.Auth))
  }
}
