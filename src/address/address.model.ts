import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'Endereco' })
export class Address extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  rua: string;

  @Column
  numero: string;

  @Column
  complemento: string;

  @Column
  bairro: string;

  @Column
  cidade: string;

  @Column
  estado: string;

  @Column
  cep: string;

  @ForeignKey(() => User)
  @Column
  id_usuario: string;
}
