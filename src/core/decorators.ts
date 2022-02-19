import 'reflect-metadata';
import { IRouter } from './interfaces';
import { MetadataKey, Method } from './enums';

export const Controller = (basePath?: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKey.BASE_PATH, `/${basePath || ''}`, target);
  };
};

const methodDecoratorFactory = (method: Method) => {
  return (path?: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol) => {
      const controllerClass = target.constructor;

      const routers: IRouter[] = Reflect.hasMetadata(
        MetadataKey.ROUTERS,
        controllerClass
      )
        ? Reflect.getMetadata(MetadataKey.ROUTERS, controllerClass)
        : [];

      routers.push({
        method,
        path: path || '',
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKey.ROUTERS, routers, controllerClass);
    };
  };
};

export const Get = methodDecoratorFactory(Method.GET);
export const Post = methodDecoratorFactory(Method.POST);
export const Put = methodDecoratorFactory(Method.PUT);
export const Patch = methodDecoratorFactory(Method.PATCH);
export const Delete = methodDecoratorFactory(Method.DELETE);
