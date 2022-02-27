import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ModifiedRequest, UserToken } from './types';
import { ErrorMessage } from './enums';
import { LOCAL_JWT_SECRET } from './constants';
import { ApiError } from '../helpers';

const secret: string = process.env.JWT_SECRET || LOCAL_JWT_SECRET;

export function safeCall(error?: ApiError): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const stock = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        await stock.call(target, req, res, next);
      } catch (e) {
        next(error || e);
      }
    };
  };
}

export function auth(...roles: string[]): MethodDecorator {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const original = descriptor.value;

    descriptor.value = function (
      req: ModifiedRequest,
      res: Response,
      next: NextFunction
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
        return original.call(target, req, res, next);
      } catch (e) {
        next(ApiError.authError(ErrorMessage.Auth));
      }
    };
  };
}
