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
import { DocumentoVerificacaoStatus } from '../../domain/documento-verificacao-status.js';
import { ProfissionalPerfilEntity } from './profissional-perfil.entity.js';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'profissional_documentos_verificacao' })
@Index('idx_doc_verificacao_profissional_status', ['profissionalId', 'status'])
@Index('idx_doc_verificacao_status_criado', ['status', 'criadoEm'])
export class ProfissionalDocumentoVerificacaoEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'profissional_id', type: 'int', unsigned: true })
  profissionalId!: number;

  @ManyToOne(() => ProfissionalPerfilEntity, { nullable: false })
  @JoinColumn({ name: 'profissional_id' })
  profissional!: ProfissionalPerfilEntity;

  @Column({ name: 'enviado_por_id', type: 'int', unsigned: true })
  enviadoPorId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'enviado_por_id' })
  enviadoPor!: UsuarioEntity;

  @Column({
    name: 'analisado_por_id',
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  analisadoPorId!: number | null;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: 'analisado_por_id' })
  analisadoPor!: UsuarioEntity | null;

  @Column({ name: 'tipo_documento', type: 'varchar', length: 60 })
  tipoDocumento!: string;

  @Column({ name: 'referencia_arquivo', type: 'varchar', length: 180 })
  referenciaArquivo!: string;

  @Column({ name: 'nome_arquivo', type: 'varchar', length: 180, nullable: true })
  nomeArquivo!: string | null;

  @Column({ type: 'varchar', length: 600, nullable: true })
  observacao!: string | null;

  @Column({ type: 'varchar', length: 24, default: DocumentoVerificacaoStatus.Pendente })
  status!: DocumentoVerificacaoStatus;

  @Column({ name: 'motivo_rejeicao', type: 'varchar', length: 600, nullable: true })
  motivoRejeicao!: string | null;

  @Column({ name: 'analisado_em', type: 'timestamp', nullable: true })
  analisadoEm!: Date | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
