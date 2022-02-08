import { reviewService } from '../services'
import { ModifiedRequest } from '../shared/types'
import { Response } from 'express'
import { GetBookReviewDto } from '../shared/dtos'
import { Review } from '../shared/models'
import { errorHandler } from '../shared/decorators'

export default class ReviewController {
  async get(req: ModifiedRequest & GetBookReviewDto, res: Response) {
    const reviews: Review[] = await reviewService.getByRoom(req.query._room)
    return res.json(reviews)
  }

  @errorHandler
  async create(req: ModifiedRequest, res: Response) {
    const { _room, author, content } = req.body
    const review: Review = await reviewService.create(_room, author, content)
    return res.json(review)
  }

  @errorHandler
  async change(req: ModifiedRequest, res: Response) {
    const { _id, content } = req.body
    const review: Review = await reviewService.change(_id, content)
    return res.json(review)
  }

  @errorHandler
  async delete(req: ModifiedRequest, res: Response) {
    const id: string = await reviewService.delete(req.body._id)
    return res.json(id)
  }
}
