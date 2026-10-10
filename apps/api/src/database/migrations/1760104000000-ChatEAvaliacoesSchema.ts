import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatEAvaliacoesSchema1760104000000 implements MigrationInterface {
  name = 'ChatEAvaliacoesSchema1760104000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE mensagens_atendimento (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        solicitacao_id INT UNSIGNED NOT NULL,
        autor_id INT UNSIGNED NOT NULL,
        conteudo VARCHAR(1000) NOT NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX idx_mensagens_atendimento_solicitacao (solicitacao_id, criado_em),
        INDEX idx_mensagens_atendimento_autor (autor_id),
        CONSTRAINT fk_mensagens_atendimento_solicitacao
          FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_mensagens_atendimento_autor
          FOREIGN KEY (autor_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE avaliacoes (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        solicitacao_id INT UNSIGNED NOT NULL,
        avaliador_id INT UNSIGNED NOT NULL,
        avaliado_id INT UNSIGNED NOT NULL,
        nota TINYINT UNSIGNED NOT NULL,
        comentario VARCHAR(600) NULL,
        moderacao_status VARCHAR(24) NOT NULL DEFAULT 'pendente',
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_avaliacoes_participantes (solicitacao_id, avaliador_id, avaliado_id),
        INDEX idx_avaliacoes_avaliado (avaliado_id),
        INDEX idx_avaliacoes_moderacao (moderacao_status),
        CONSTRAINT chk_avaliacoes_nota CHECK (nota BETWEEN 1 AND 5),
        CONSTRAINT chk_avaliacoes_moderacao CHECK (
          moderacao_status IN ('pendente', 'aprovada', 'rejeitada')
        ),
        CONSTRAINT fk_avaliacoes_solicitacao
          FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_avaliacoes_avaliador
          FOREIGN KEY (avaliador_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_avaliacoes_avaliado
          FOREIGN KEY (avaliado_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE avaliacoes');
    await queryRunner.query('DROP TABLE mensagens_atendimento');
  }
}
