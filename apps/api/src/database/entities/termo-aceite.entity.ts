import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'termo_aceites' })
@Index('uq_termo_aceites_usuario_versao', ['usuarioId', 'versao'], {
  unique: true,
})
@Index('idx_termo_aceites_usuario', ['usuarioId', 'aceitoEm'])
export class TermoAceiteEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'usuario_id', type: 'int', unsigned: true })
  usuarioId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @Column({ type: 'varchar', length: 40 })
  versao!: string;

  @Column({ type: 'varchar', length: 30, default: 'api' })
  canal!: string;

  @Column({ name: 'aceito_em', type: 'timestamp' })
  aceitoEm!: Date;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;
}
