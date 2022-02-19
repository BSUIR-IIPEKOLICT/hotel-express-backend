import { Request } from 'express';

export type UserToken = {
  _id?: string;
  email: string;
  role: string;
};

export type ModifiedRequest = Request & {
  user?: UserToken;
};

export type Middleware = (e: Error) => void;
