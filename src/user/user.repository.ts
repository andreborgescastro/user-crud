import { Repository } from 'sequelize-typescript';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
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

  private generateUser(
    userDto: Partial<CreateUserDto>,
    usuarioCriacao: string,
  ) {
    return {
      id: null,
      status: true,
      usuario_criacao: usuarioCriacao,
      ...userDto,
    };
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
    console.log('Repositório:', user);
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

  public destroy(id: string): Promise<number> {
    return this.userRepository.destroy({ where: { id } });
  }
}
