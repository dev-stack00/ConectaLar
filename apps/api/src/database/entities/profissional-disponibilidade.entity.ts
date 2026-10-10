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
import { ProfissionalPerfilEntity } from './profissional-perfil.entity.js';

@Entity({ name: 'profissional_disponibilidades' })
@Index('idx_profissional_disponibilidades_profissional', [
  'profissionalId',
  'diaSemana',
])
export class ProfissionalDisponibilidadeEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ name: 'profissional_id', type: 'int', unsigned: true })
  profissionalId!: number;

  @ManyToOne(() => ProfissionalPerfilEntity, { nullable: false })
  @JoinColumn({ name: 'profissional_id' })
  profissional!: ProfissionalPerfilEntity;

  @Column({ name: 'dia_semana', type: 'tinyint', unsigned: true })
  diaSemana!: number;

  @Column({ name: 'hora_inicio', type: 'varchar', length: 5 })
  horaInicio!: string;

  @Column({ name: 'hora_fim', type: 'varchar', length: 5 })
  horaFim!: string;

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm!: Date;
}
