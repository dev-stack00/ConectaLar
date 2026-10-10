import { MigrationInterface, QueryRunner } from 'typeorm';

export class DocumentosVerificacaoSchema1760108000000 implements MigrationInterface {
  name = 'DocumentosVerificacaoSchema1760108000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profissional_documentos_verificacao (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        profissional_id INT UNSIGNED NOT NULL,
        enviado_por_id INT UNSIGNED NOT NULL,
        analisado_por_id INT UNSIGNED NULL,
        tipo_documento VARCHAR(60) NOT NULL,
        referencia_arquivo VARCHAR(180) NOT NULL,
        nome_arquivo VARCHAR(180) NULL,
        observacao VARCHAR(600) NULL,
        status VARCHAR(24) NOT NULL DEFAULT 'pendente',
        motivo_rejeicao VARCHAR(600) NULL,
        analisado_em TIMESTAMP(6) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_doc_verificacao_profissional_status (profissional_id, status),
        INDEX idx_doc_verificacao_status_criado (status, criado_em),
        CONSTRAINT chk_doc_verificacao_status
          CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
        CONSTRAINT fk_doc_verificacao_profissional
          FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_doc_verificacao_enviado_por
          FOREIGN KEY (enviado_por_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_doc_verificacao_analisado_por
          FOREIGN KEY (analisado_por_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE profissional_documentos_verificacao');
  }
}
