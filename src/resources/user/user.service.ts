import User from '~/entity/user.entity';
import Answer from '~/entity/answer.entity';
import UserRepository from '~/resources/user/user.repository';

class UserService {
  public exist(user_id: number): Promise<boolean> {
    return UserRepository.exist(user_id);
  }

  public findById(user_id: number): Promise<User | null> {
    return UserRepository.findById(user_id);
  }

  public createUser(user: User): Promise<User> {
    return UserRepository.addUser(user);
  }

  public async updateUser(user_id: number, partial_user: Partial<User>): Promise<User> {
    const user = {
      ...(await UserRepository.findById(user_id)),
      ...partial_user
    };

    return UserRepository.saveUser(user as User);
  }

  public deleteUser(user_id: number): Promise<boolean> {
    return UserRepository.deleteUser(user_id);
  }

  public getUserAnswers(user_id: number): Promise<Answer[]> {
    return UserRepository.getUserAnswers(user_id);
  }
}

export default new UserService();
