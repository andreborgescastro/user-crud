import { IsNumberString, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  rua: string;

  @IsNumberString()
  numero: string;

  @IsString()
  bairro: string;

  @IsString()
  complemento?: string;

  @IsString()
  cep: string;
}
