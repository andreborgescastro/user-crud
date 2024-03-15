import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { Repository } from 'sequelize-typescript';
import { CreateAddressDto } from './dto/address.dto';

export class AddressRepository {
  constructor(
    @InjectModel(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public createAddress(dto: CreateAddressDto) {
    return this.addressRepository.create({ id: null, ...dto });
  }
}
