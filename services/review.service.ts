import { Review } from '../shared/models'
import { ReviewRepository } from '../shared/repositories'

export default class ReviewService extends ReviewRepository {
  async getByRoom(_room: string): Promise<Review[]> {
    return this.model.find({ _room }).lean()
  }

  async getOne(_id: string): Promise<Review> {
    return this.model.findById(_id).lean()
  }

  async create(
    _room: string,
    author: string,
    content: string
  ): Promise<Review> {
    const review = await new this.model({ _room, author, content })
    await review.save()
    return this.getOne(review._id)
  }

  async change(_id: string, content: string): Promise<Review> {
    await this.model.findByIdAndUpdate(_id, {
      $set: { content },
    })
    return this.getOne(_id)
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithRoom(roomId: string): Promise<void> {
    await this.model.deleteMany({ _room: roomId })
  }
}
