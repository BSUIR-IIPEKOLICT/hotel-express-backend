import { Method } from './enums';
import { Handler } from 'express';

export interface IRouter {
  method: Method;
  path: string;
  handlerName: string | symbol;
}

export interface IController {
  [handleName: string]: Handler;
}
