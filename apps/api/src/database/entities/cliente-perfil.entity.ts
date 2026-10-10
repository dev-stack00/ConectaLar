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
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'cliente_perfis' })
@Index('uq_cliente_perfis_usuario', ['usuarioId'], { unique: true })
export class ClientePerfilEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'usuario_id', type: 'int', unsigned: true })
  usuarioId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @Column({ name: 'bairro_principal', type: 'varchar', length: 120, nullable: true })
  bairroPrincipal!: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  cidade!: string | null;

  @Column({ type: 'char', length: 2, nullable: true })
  uf!: string | null;

  @Column({ type: 'varchar', length: 280, nullable: true })
  observacoes!: string | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
