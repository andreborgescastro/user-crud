import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressRepository } from './address.repository';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  exports: [AddressService],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
