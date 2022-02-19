import jwt from 'jsonwebtoken';
import { hash, compareSync } from 'bcrypt';
import {
  basketService,
  orderService,
  roomService,
  userService,
} from '../services';
import {
  LOCAL_JWT_SECRET,
  MIN_EMAIL_CHUNKS_AMOUNT,
  MIN_PASSWORD_LENGTH,
} from '../shared/constants';
import { ModifiedRequest, UserToken } from '../shared/types';
import { Response } from 'express';
import { EndPoint, ErrorMessage, Role, Selector } from '../shared/enums';
import { BasketPopulated, OrderPopulated, User } from '../shared/models';
import { auth, errorHandler } from '../shared/decorators';
import { Controller, Delete, Get, Patch, Post } from '../core/decorators';
import { ApiError } from '../helpers';

const generateToken = (user: UserToken) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || LOCAL_JWT_SECRET,
    { expiresIn: '24h' }
  );
};

@Controller(EndPoint.Users)
export default class UserController {
  @Get()
  @auth(Role.Admin)
  async getAll(req: ModifiedRequest, res: Response) {
    const users: User[] = await userService.get();
    return res.json(users);
  }

  @Post(EndPoint.Register)
  async register(req: ModifiedRequest, res: Response, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest(ErrorMessage.LoginData));
    }

    if (email.split(/[@.]/g).length < MIN_EMAIL_CHUNKS_AMOUNT) {
      return next(ApiError.badRequest(ErrorMessage.BadEmail));
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return next(ApiError.badRequest(ErrorMessage.BadPassword));
    }

    const candidate: User | undefined = await userService.getByEmail(email);

    if (candidate) {
      return next(ApiError.badRequest(ErrorMessage.UserExists));
    }

    const usersCount: number = await userService.count();
    const hashPassword: string = await hash(password, 5);

    const user: User = await userService.create(
      email,
      hashPassword,
      !usersCount ? 'admin' : 'client'
    );

    await basketService.create(user._id);

    return res.json({ token: generateToken(user) });
  }

  @Post(EndPoint.Login)
  async login(req: ModifiedRequest, res: Response, next) {
    const { email, password } = req.body;
    const user: User | undefined = await userService.getByEmail(email);

    if (!user) return next(ApiError.internal(ErrorMessage.UserNotExists));
    if (!compareSync(password, user.password)) {
      return next(ApiError.internal(ErrorMessage.Password));
    }

    return res.json({ token: generateToken(user) });
  }

  @Post(EndPoint.Auth)
  async auth(req: ModifiedRequest, res: Response) {
    const user: User | undefined = await userService.getByEmail(req.user.email);
    if (!user) return;
    return res.json({ token: generateToken(user) });
  }

  @Patch(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async changeRole(req: ModifiedRequest, res: Response) {
    const user = await userService.change(req.params.id, req.body.role);
    return res.json(user);
  }

  @Delete(Selector.Id)
  @auth(Role.Admin)
  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const user: User = await userService.getOne(req.params.id);
    const id: string = await userService.delete(req.params.id);
    const basket: BasketPopulated = await basketService.getOne(user._id);
    const orders: OrderPopulated[] = await orderService.get(basket._id);

    orders.map(async ({ _room }) => await roomService.unBookRoom(_room._id));

    await orderService.deleteWithBasket(basket._id);
    await basketService.delete(basket._id);

    return res.json({ id });
  }
}
