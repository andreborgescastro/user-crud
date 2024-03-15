import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateAddressDto } from '../address/dto/createAddress.dto';
import * as moment from 'moment';
import { AddressService } from './../address/address.service';
import { Address } from './../address/address.model';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addressService: AddressService,
    private readonly authService: AuthService,
  ) {}

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

  async updateUser(id: string, dto: any): Promise<User> {
    const { endereco } = dto;
    if (endereco) {
      const [affectedRows] = await this.addressService.updateAddress({
        ...endereco,
        id_usuario: id,
      });

      if (!affectedRows) {
        console.log('Hey');
        await this.addressService.createAddress({
          ...endereco,
          id_usuario: id,
        });
      }
    }
    await this.userRepository.update(id, { ...dto });
    return this.getUser(id);
  }

  async createUser(dto: CreateUserDto, header: any): Promise<User> {
    try {
      const username = this.authService.extractUsernameFromHeader(header);
      const birthdate = this.getBirthdate(dto.data_nascimento);

      const { id: p_id } = await this.userRepository.save({
        ...dto,
        data_nascimento: birthdate,
        usuario_criacao: username,
      });

      const id = p_id.toString();
      dto.endereco['id_usuario'] = id;

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

  createAddress(address: CreateAddressDto): Promise<Address> {
    return this.addressService.createAddress(address);
  }

  async destroy(id: string, header: any): Promise<void> {
    try {
      const username = this.authService.extractUsernameFromHeader(header);
      await this.userRepository.destroy(id, username);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            'Não foi possível identificar o usuário, verifique seu token.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
