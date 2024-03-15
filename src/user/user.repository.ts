import { Repository } from 'sequelize-typescript';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

export class UserRepository {
  constructor(
    @InjectModel(User)
    private userRepository: Repository<User>,
  ) {}

  public findAll(): Promise<User[]> {
    return this.userRepository.findAll({});
  }

  public findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public save(user: any): Promise<User> {
    return this.userRepository.create(user);
  }

  public update(
    id: number,
    updateUserDto: any,
  ): Promise<[affectedCount: number, affectedRows: User[]]> {
    return this.userRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  public destroy(id: number): Promise<number> {
    return this.userRepository.destroy({ where: { id } });
  }
}
