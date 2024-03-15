import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), AddressModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
