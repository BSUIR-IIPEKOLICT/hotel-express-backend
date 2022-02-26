import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { Controller, Get } from '../core/decorators';
import { BaseController } from '../core/abstractions';
import { HEALTH_CHECK_MESSAGE } from '../shared/constants';

@Controller()
export default class TestController extends BaseController {
  @Get()
  healthCheck(req: ModifiedRequest, res: Response) {
    return res.json({ message: HEALTH_CHECK_MESSAGE });
  }
}
