import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { Repository } from 'sequelize-typescript';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdateAddressDto } from './dto/updateAddress.dto';

export class AddressRepository {
  constructor(
    @InjectModel(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public save(dto: CreateAddressDto) {
    return this.addressRepository.create({ id: null, ...dto });
  }

  public update(
    dto: UpdateAddressDto,
  ): Promise<[affectedCount: number, affectedRows: Address[]]> {
    return this.addressRepository.update(dto, {
      where: { id_usuario: dto.id_usuario },
      returning: true,
    });
  }
}
