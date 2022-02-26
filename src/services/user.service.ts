import { UserRepository } from '../shared/repositories';
import { User } from '../shared/models';

export default class UserService extends UserRepository {
  async getByEmail(email: string): Promise<User> | undefined {
    return this.model.findOne({ email }).lean();
  }

  async create(email: string, password: string, role: string): Promise<User> {
    const user = await new this.model({ email, password, role });
    await user.save();
    return user;
  }

  async change(_id: string, role: string): Promise<User> {
    await this.model
      .findByIdAndUpdate(_id, {
        $set: { role },
      })
      .lean();
    return this.getOne(_id);
  }
}
