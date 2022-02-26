import { ErrorMessage } from '../shared/enums';
import { NextFunction, Request, Response } from 'express';
import ApiError from './api.error';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError)
    return res.status(err.status).json({ message: err.message });

  return res.status(500).json({ message: ErrorMessage.Unknown });
}
