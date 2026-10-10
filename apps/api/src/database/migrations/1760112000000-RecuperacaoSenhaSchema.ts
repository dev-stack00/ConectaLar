import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecuperacaoSenhaSchema1760112000000 implements MigrationInterface {
  name = 'RecuperacaoSenhaSchema1760112000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE usuarios
      ADD COLUMN token_version INT UNSIGNED NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      CREATE TABLE usuario_senha_resets (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        token_hash VARCHAR(64) NOT NULL,
        expira_em TIMESTAMP(6) NOT NULL,
        usado_em TIMESTAMP(6) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_usuario_senha_resets_token_hash (token_hash),
        INDEX idx_usuario_senha_resets_usuario_criado (usuario_id, criado_em),
        CONSTRAINT fk_usuario_senha_resets_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE usuario_senha_resets');
    await queryRunner.query('ALTER TABLE usuarios DROP COLUMN token_version');
  }
}
