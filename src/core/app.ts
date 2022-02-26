import express, { Application, Request, Response, Router } from 'express';
import { MetadataKey } from './enums';
import { IController, IRouter } from './interfaces';
import { ControllerClass, Info } from './types';

export default class App {
  private readonly instance: Application;

  getInstance(): Application {
    return this.instance;
  }

  constructor(
    configureApp: (app: Application) => void = () => {},
    controllers: ControllerClass[] = [],
    errorHandler?: (err: Error, req: Request, res: Response, next: any) => void
  ) {
    this.instance = express();
    configureApp(this.instance);
    this.registerRouters(controllers);

    if (errorHandler) {
      this.instance.use(errorHandler);
    }
  }

  private registerRouters(controllers: ControllerClass[]) {
    const info: Info[] = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: IController = new controllerClass();
      const basePath: string = Reflect.getMetadata(
        MetadataKey.BASE_PATH,
        controllerClass
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKey.ROUTERS,
        controllerClass
      );
      const router = Router();

      routers.forEach(({ method, path, handlerName }) => {
        router[method](
          path,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this.instance.use(basePath, router);
    });

    console.table(info);
  }
}
