import { UserRepository } from '../shared/repositories'
import { User } from '../shared/models'

export default class UserService extends UserRepository {
  async get(): Promise<User[]> {
    return this.model.find({}).lean()
  }

  async getOne(_id: string): Promise<User> {
    return this.model.findById(_id).lean()
  }

  async getByEmail(email: string): Promise<User> | undefined {
    return this.model.findOne({ email }).lean()
  }

  async count(): Promise<number> {
    return this.model.countDocuments()
  }

  async create(email: string, password: string, role: string): Promise<User> {
    const user = await new this.model({ email, password, role })
    await user.save()
    return user
  }

  async change(_id: string, role: string): Promise<User> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { role },
      })
      .lean()
    return this.getOne(_id)
  }

  async delete(_id: string): Promise<string> {
    await this.model.findByIdAndRemove(_id)
    return _id
  }
}
