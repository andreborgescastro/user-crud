import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  public createAddres(dto: CreateAddressDto) {
    return this.addressRepository.createAddress(dto);
  }
}
