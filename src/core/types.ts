import { IController } from './interfaces';

export type ControllerClass = new (...args: any) => IController;
export type Info = {
  api: string;
  handler: string;
};
