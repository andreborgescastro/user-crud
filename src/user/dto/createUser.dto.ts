import { IsNumberString, IsString } from 'class-validator';
import { CreateAddressDto } from './../../address/dto/createAddress.dto';

export class CreateUserDto {
  @IsNumberString()
  cpf: string;

  @IsString()
  nome: string;

  @IsString()
  data_nascimento: string;

  endereco: CreateAddressDto;
}
