import { reviewService } from '../services';
import { ModifiedRequest } from '../shared/types';
import { Response } from 'express';
import { GetBookReviewDto } from '../shared/dtos';
import { Review } from '../shared/models';
import { safeCall } from '../shared/decorators';
import { Controller, Delete, Get, Patch, Post } from '../core/decorators';
import { EndPoint, Selector } from '../shared/enums';
import { BaseController } from '../core/abstractions';

@Controller(EndPoint.Reviews)
export default class ReviewController extends BaseController {
  @Get()
  async get(req: ModifiedRequest & GetBookReviewDto, res: Response) {
    const reviews: Review[] = await reviewService.getByRoom(req.query._room);
    return res.json(reviews);
  }

  @Post()
  @safeCall()
  async create(req: ModifiedRequest, res: Response) {
    const { _room, author, content } = req.body;
    const review: Review = await reviewService.create(_room, author, content);
    return res.json(review);
  }

  @Patch(Selector.Id)
  @safeCall()
  async change(req: ModifiedRequest, res: Response) {
    const review: Review = await reviewService.change(
      req.params.id,
      req.body.content
    );
    return res.json(review);
  }

  @Delete(Selector.Id)
  @safeCall()
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await reviewService.delete(req.params.id);
    return res.json({ id });
  }
}
