import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './user/user.model';
import { Endereco } from './endereco/endereco.model';

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
      database: process.env.DB,
      models: [Usuario, Endereco],
    }),
  ],
})
export class AppModule {}
