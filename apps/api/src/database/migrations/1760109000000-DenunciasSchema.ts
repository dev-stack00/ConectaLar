import { MigrationInterface, QueryRunner } from 'typeorm';

export class DenunciasSchema1760109000000 implements MigrationInterface {
  name = 'DenunciasSchema1760109000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE denuncias (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        solicitacao_id INT UNSIGNED NOT NULL,
        denunciante_id INT UNSIGNED NOT NULL,
        denunciado_id INT UNSIGNED NOT NULL,
        analisado_por_id INT UNSIGNED NULL,
        motivo VARCHAR(80) NOT NULL,
        descricao VARCHAR(1000) NOT NULL,
        status VARCHAR(24) NOT NULL DEFAULT 'pendente',
        decisao VARCHAR(1000) NULL,
        analisado_em TIMESTAMP(6) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_denuncias_status_criado (status, criado_em),
        INDEX idx_denuncias_denunciante (denunciante_id),
        INDEX idx_denuncias_denunciado (denunciado_id),
        INDEX idx_denuncias_solicitacao (solicitacao_id),
        CONSTRAINT chk_denuncias_status
          CHECK (status IN ('pendente', 'em_analise', 'resolvida', 'rejeitada')),
        CONSTRAINT chk_denuncias_partes
          CHECK (denunciante_id <> denunciado_id),
        CONSTRAINT fk_denuncias_solicitacao
          FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_denuncias_denunciante
          FOREIGN KEY (denunciante_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_denuncias_denunciado
          FOREIGN KEY (denunciado_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_denuncias_analisado_por
          FOREIGN KEY (analisado_por_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE denuncias');
  }
}
