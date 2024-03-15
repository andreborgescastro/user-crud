import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateAddressDto } from 'src/address/dto/address.dto';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getBirthdate(date: string) {
    const allowedFormats = ['DD/MM/YYYY'];

    if (date) {
      const validatedDate = moment(date, allowedFormats, true);

      if (validatedDate.isValid()) {
        return validatedDate.toDate();
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message:
              'A data ou formato informado é inválido(Formato aceito: DD/MM/YYYY)',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: string, dto: any): Promise<User[]> {
    const [, affectedRows] = await this.userRepository.update(id, dto);
    return affectedRows;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const birthdate = this.getBirthdate(dto.data_nascimento);
      delete dto.data_nascimento;
      const { id } = await this.userRepository.save({
        data_nascimento: birthdate,
        ...dto,
        usuario_criacao: 'admin',
      });
      await this.createAddress(dto.endereco);
      return this.getUser(id.toString());
    } catch (error) {
      const messageObj = error?.errors[0];
      if (messageObj?.type === 'unique violation') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'O atributo ' + messageObj?.path + ' deve ser único.',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.error(error);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  createAddress(p_address: CreateAddressDto) {
    const address = JSON.parse(JSON.stringify(p_address));
    // Deve criar o endereço a partir do service de endereço
    return null;
  }

  getAddress(dto: CreateUserDto) {}

  destroy(id: string): Promise<number> {
    return this.userRepository.destroy(id);
  }
}
