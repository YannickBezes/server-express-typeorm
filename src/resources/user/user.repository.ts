import {AppDataSource} from '~/data-source';
import User from '~/entity/user.entity';
import Answer from '~/entity/answer.entity';

const UserRepository = AppDataSource.getRepository(User).extend({
  async findById(user_id: number): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.id = :user_id', { user_id })
      .getOne();
  },

  async exist(user_id: number): Promise<boolean> {
    return this.createQueryBuilder('user')
      .where('user.id = :user_id', { user_id })
      .getExists();
  },

  async deleteUser(user_id: number): Promise<boolean> {
    const result = await this.delete(user_id);
    return result.affected === 1;
  },

  async getUserAnswers(user_id: number): Promise<Answer[]> {
    return this.createQueryBuilder('user')
      .relation(User, 'answers')
      .of(user_id)
      .loadMany();
  },

  async addUser(user: User): Promise<User> {
    return this.save(user);
  },

  async saveUser(user: User): Promise<User> {
    return this.save(user);
  }
});

export default UserRepository;
