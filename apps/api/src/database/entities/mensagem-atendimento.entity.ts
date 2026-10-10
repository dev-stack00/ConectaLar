import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolicitacaoEntity } from './solicitacao.entity.js';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'mensagens_atendimento' })
@Index('idx_mensagens_atendimento_solicitacao', ['solicitacaoId', 'criadoEm'])
export class MensagemAtendimentoEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'solicitacao_id', type: 'int', unsigned: true })
  solicitacaoId!: number;

  @ManyToOne(() => SolicitacaoEntity, { nullable: false })
  @JoinColumn({ name: 'solicitacao_id' })
  solicitacao!: SolicitacaoEntity;

  @Column({ name: 'autor_id', type: 'int', unsigned: true })
  autorId!: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'autor_id' })
  autor!: UsuarioEntity;

  @Column({ type: 'varchar', length: 1000 })
  conteudo!: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;
}
