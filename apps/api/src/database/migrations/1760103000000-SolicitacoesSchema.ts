import { MigrationInterface, QueryRunner } from 'typeorm';

export class SolicitacoesSchema1760103000000 implements MigrationInterface {
  name = 'SolicitacoesSchema1760103000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE solicitacoes (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        cliente_id INT UNSIGNED NOT NULL,
        profissional_id INT UNSIGNED NOT NULL,
        categoria_id INT UNSIGNED NULL,
        descricao VARCHAR(600) NOT NULL,
        bairro_atendimento VARCHAR(120) NOT NULL,
        data_servico DATE NOT NULL,
        horario_servico VARCHAR(5) NOT NULL,
        preco_inicial DECIMAL(10,2) NULL,
        status VARCHAR(32) NOT NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_solicitacoes_cliente (cliente_id),
        INDEX idx_solicitacoes_profissional (profissional_id),
        INDEX idx_solicitacoes_status (status),
        INDEX idx_solicitacoes_categoria (categoria_id),
        CONSTRAINT chk_solicitacoes_status CHECK (
          status IN (
            'aguardando_resposta',
            'aceita_agendada',
            'recusada',
            'cancelada',
            'conclusao_confirmada'
          )
        ),
        CONSTRAINT fk_solicitacoes_cliente
          FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_solicitacoes_profissional
          FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_solicitacoes_categoria
          FOREIGN KEY (categoria_id) REFERENCES categorias(id)
          ON DELETE SET NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE solicitacoes');
  }
}
