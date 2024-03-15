import { Repository } from 'sequelize-typescript';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './../address/address.model';

export class UserRepository {
  constructor(
    @InjectModel(User)
    private userRepository: Repository<User>,
  ) {}

  private getAddressStatement(): {
    model: typeof Address;
    attributes: string[];
  }[] {
    return [
      {
        model: Address,
        attributes: ['rua', 'numero', 'bairro', 'complemento', 'numero', 'cep'],
      },
    ];
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.findAll({
      include: this.getAddressStatement(),
    });
  }

  public findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      include: this.getAddressStatement(),
      where: { id },
    });
  }

  public save(user): Promise<User> {
    return this.userRepository.create({ id: null, ...user });
  }

  public update(
    id: string,
    updateUserDto: any,
  ): Promise<[affectedCount: number, affectedRows: User[]]> {
    return this.userRepository.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  public destroy(
    id: string,
    username: string,
  ): Promise<[affectedCount: number]> {
    removido_em: new Date();
    return this.userRepository.update(
      { id, usuario_remocao: username, status: false, removido_em: new Date() },
      { where: { id } },
    );
  }
}
