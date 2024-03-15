import {
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Endereco } from 'src/endereco/endereco.model';

@Table
export class Usuario extends Model {
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

  @Column
  criado_em: Date;

  @Column
  usuario_criacao: string;

  @Column
  removido_em: Date;

  @Column
  usuario_remocao: string;

  @HasOne(() => Endereco)
  endereco: Endereco;
}
