import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DenunciaStatus } from '../../domain/denuncia-status.js';
import { SolicitacaoEntity } from './solicitacao.entity.js';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'denuncias' })
@Index('idx_denuncias_status_criado', ['status', 'criadoEm'])
@Index('idx_denuncias_denunciante', ['denuncianteId'])
@Index('idx_denuncias_denunciado', ['denunciadoId'])
@Index('idx_denuncias_solicitacao', ['solicitacaoId'])
export class DenunciaEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'solicitacao_id', type: 'int', unsigned: true })
  solicitacaoId!: number;

  @ManyToOne(() => SolicitacaoEntity, { nullable: false })
  @JoinColumn({ name: 'solicitacao_id' })
  solicitacao!: SolicitacaoEntity;

  @Column({ name: 'denunciante_id', type: 'int', unsigned: true })
  denuncianteId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'denunciante_id' })
  denunciante!: UsuarioEntity;

  @Column({ name: 'denunciado_id', type: 'int', unsigned: true })
  denunciadoId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'denunciado_id' })
  denunciado!: UsuarioEntity;

  @Column({ name: 'analisado_por_id', type: 'int', unsigned: true, nullable: true })
  analisadoPorId!: number | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: 'analisado_por_id' })
  analisadoPor!: UsuarioEntity | null;

  @Column({ type: 'varchar', length: 80 })
  motivo!: string;

  @Column({ type: 'varchar', length: 1000 })
  descricao!: string;

  @Column({ type: 'varchar', length: 24, default: DenunciaStatus.Pendente })
  status!: DenunciaStatus;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  decisao!: string | null;

  @Column({ name: 'analisado_em', type: 'timestamp', nullable: true })
  analisadoEm!: Date | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
