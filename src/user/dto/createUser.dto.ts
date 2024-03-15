import { IsNumberString, IsString } from 'class-validator';
import { CreateAddressDto } from './../../address/dto/createAddress.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNumberString()
  cpf: string;

  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  data_nascimento: string;

  @ApiProperty()
  endereco: CreateAddressDto;
}
