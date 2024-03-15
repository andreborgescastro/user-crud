import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Address } from './address/address.model';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo principal da aplicação.
 * Responsável por configurar o core da aplicação, bem como
 * relacionar os demais módulos necessários para o funcionamento como
 * modelos a serem inicializados pelo ORM durante a conexão com o banco de dados,
 * a módulos necessários para funcionamento das demais features da API.
 */
@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Address],
    }),
    AddressModule,
    AuthModule,
  ],
})
export class AppModule {}
