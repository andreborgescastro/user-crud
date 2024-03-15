import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Usuario } from 'src/user/user.model';

@Table
export class Endereco extends Model {
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

  @ForeignKey(() => Usuario)
  @Column
  id_usuario: string;
}
