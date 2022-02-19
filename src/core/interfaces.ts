import { Method } from './enums';

export interface IRouter {
  method: Method;
  path: string;
  handlerName: string | symbol;
}
