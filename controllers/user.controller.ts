import jwt from 'jsonwebtoken'
import ApiError from '../errors/api.error'
import { hash, compareSync } from 'bcrypt'
import {
  basketService,
  orderService,
  roomService,
  userService,
} from '../services'
import {
  LOCAL_JWT_SECRET,
  MIN_EMAIL_CHUNKS_AMOUNT,
  MIN_PASSWORD_LENGTH,
} from '../shared/constants'
import { ModifiedRequest, UserToken } from '../shared/types'
import { Response } from 'express'
import { ErrorMessage } from '../shared/enums'
import { BasketPopulated, OrderPopulated, User } from '../shared/models'
import { errorHandler } from '../shared/decorators'

const generateToken = (user: UserToken) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || LOCAL_JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export default class UserController {
  async register(req: ModifiedRequest, res: Response, next) {
    const { email, password } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest(ErrorMessage.LoginData))
    }

    if (email.split(/[@.]/g).length < MIN_EMAIL_CHUNKS_AMOUNT) {
      return next(ApiError.badRequest(ErrorMessage.BadEmail))
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return next(ApiError.badRequest(ErrorMessage.BadPassword))
    }

    const candidate: User | undefined = await userService.getByEmail(email)

    if (candidate) {
      return next(ApiError.badRequest(ErrorMessage.UserExists))
    }

    const usersCount: number = await userService.count()
    const hashPassword: string = await hash(password, 5)

    const user: User = await userService.create(
      email,
      hashPassword,
      !usersCount ? 'admin' : 'client'
    )

    await basketService.create(user._id)

    return res.json(generateToken(user))
  }

  async login(req: ModifiedRequest, res: Response, next) {
    const { email, password } = req.body
    const user: User | undefined = await userService.getByEmail(email)

    if (!user) return next(ApiError.internal(ErrorMessage.UserNotExists))
    if (!compareSync(password, user.password)) {
      return next(ApiError.internal(ErrorMessage.Password))
    }

    return res.json(generateToken(user))
  }

  async auth(req: ModifiedRequest, res: Response) {
    const user: User | undefined = await userService.getByEmail(req.user.email)
    if (!user) return
    return res.json(generateToken(user))
  }

  async getAll(req: ModifiedRequest, res: Response) {
    const users: User[] = await userService.get()
    return res.json(users)
  }

  @errorHandler
  async changeRole(req: ModifiedRequest, res: Response) {
    const { _id, role } = req.body
    const user = await userService.change(_id, role)
    return res.json(user)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const user: User = await userService.getOne(req.body._id)
    const id: string = await userService.delete(req.body._id)
    const basket: BasketPopulated = await basketService.getOne(user._id)
    const orders: OrderPopulated[] = await orderService.get(basket._id)

    orders.map(async ({ _room }) => await roomService.unBookRoom(_room._id))

    await orderService.deleteWithBasket(basket._id)
    await basketService.delete(basket._id)

    return res.json(id)
  }
}
