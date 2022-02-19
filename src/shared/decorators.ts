import { Request, Response } from 'express';
import { Middleware, ModifiedRequest, UserToken } from './types';
import { ErrorMessage } from './enums';
import { LOCAL_JWT_SECRET } from './constants';
const secret: string = process.env.JWT_SECRET || LOCAL_JWT_SECRET;
import jwt from 'jsonwebtoken';
import { ApiError } from '../helpers';

export const errorHandler = (
  _: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const stock = descriptor.value;

  descriptor.value = async function (
    req: Request,
    res: Response,
    next: Middleware
  ) {
    try {
      await stock.call(this, req, res);
    } catch (e) {
      return next(e);
    }
  };
};

export function auth(...roles: string[]) {
  return (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function (
      req: ModifiedRequest,
      res: Response,
      next: any
    ) {
      if (req.method === 'OPTIONS') return next();

      try {
        const token: string = req.headers.authorization.split(' ')[1];

        if (!token) return next(ApiError.authError(ErrorMessage.Auth));

        const decoded: UserToken = jwt.verify<UserToken>(token, secret);

        if (roles && roles.length && !roles.includes(decoded.role)) {
          return next(ApiError.forbidden(ErrorMessage.Access));
        }

        req.user = decoded;
        return original(req, res, next);
      } catch (e) {
        next(ApiError.authError(ErrorMessage.Auth));
      }
    };
  };
}
