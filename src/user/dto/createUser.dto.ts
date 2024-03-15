import { IsNumberString, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/address.dto';

export class CreateUserDto {
  @IsNumberString()
  cpf: string;

  @IsString()
  nome: string;

  @IsString()
  data_nascimento: string;

  endereco: CreateAddressDto;
}
