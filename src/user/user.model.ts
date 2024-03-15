import {
  Column,
  CreatedAt,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Address } from './../endereco/endereco.model';

@Table({ tableName: 'Usuario', updatedAt: false })
export class User extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Unique
  @Column
  cpf: string;

  @Column
  nome: string;

  @Column
  data_nascimento: Date;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  @Column
  criado_em: Date;

  @Column
  usuario_criacao: string;

  @Column
  removido_em: Date;

  @Column
  usuario_remocao: string;

  @HasOne(() => Address)
  endereco: Address;
}
