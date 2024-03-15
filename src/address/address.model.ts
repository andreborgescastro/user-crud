import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ tableName: 'Endereco', createdAt: false, updatedAt: false })
export class Address extends Model {
  @PrimaryKey
  @AutoIncrement
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
