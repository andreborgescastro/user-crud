import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';
import { Address } from './address.model';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  public createAddress(dto: CreateAddressDto) {
    return this.addressRepository.save(dto);
  }

  public updateAddress(
    dto: UpdateAddressDto,
  ): Promise<[affectedCount: number, affectedRows: Address[]]> {
    return this.addressRepository.update(dto);
  }
}
