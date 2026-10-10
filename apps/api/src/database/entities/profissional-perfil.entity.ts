import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity.js';
import { ProfissionalServicoEntity } from './profissional-servico.entity.js';

@Entity({ name: 'profissionais' })
@Index('uq_profissionais_usuario', ['usuarioId'], { unique: true })
export class ProfissionalPerfilEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'usuario_id', type: 'int', unsigned: true })
  usuarioId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @Column({ type: 'varchar', length: 280 })
  descricao!: string;

  @Column({ type: 'varchar', length: 120 })
  bairro!: string;

  @Column({
    name: 'preco_inicial',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  precoInicial!: string | null;

  @Column({ type: 'boolean', default: false })
  verificado!: boolean;

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;

  @OneToMany(
    () => ProfissionalServicoEntity,
    (servico) => servico.profissional,
  )
  servicos!: ProfissionalServicoEntity[];

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
