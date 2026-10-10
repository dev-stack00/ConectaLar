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
import { NotificacaoTipo } from '../../domain/notificacao-tipo.js';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'notificacoes' })
@Index('idx_notificacoes_usuario_lida', ['usuarioId', 'lida', 'criadoEm'])
export class NotificacaoEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'usuario_id', type: 'int', unsigned: true })
  usuarioId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @Column({ type: 'varchar', length: 40 })
  tipo!: NotificacaoTipo;

  @Column({ type: 'varchar', length: 120 })
  titulo!: string;

  @Column({ type: 'varchar', length: 240 })
  mensagem!: string;

  @Column({ name: 'recurso_tipo', type: 'varchar', length: 40, nullable: true })
  recursoTipo!: string | null;

  @Column({ name: 'recurso_id', type: 'int', unsigned: true, nullable: true })
  recursoId!: number | null;

  @Column({ type: 'boolean', default: false })
  lida!: boolean;

  @Column({ name: 'lida_em', type: 'timestamp', nullable: true })
  lidaEm!: Date | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
