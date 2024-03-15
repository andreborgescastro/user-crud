import { IsNumberString, IsString } from 'class-validator';
import { CreateAddressDto } from './../../address/dto/createAddress.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
