import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialAuthSchema1760100000000 implements MigrationInterface {
  name = 'InitialAuthSchema1760100000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE usuarios (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nome VARCHAR(140) NOT NULL,
        email VARCHAR(180) NOT NULL,
        telefone VARCHAR(32) NULL,
        tipo VARCHAR(24) NOT NULL,
        senha_hash VARCHAR(255) NOT NULL,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT chk_usuarios_tipo
          CHECK (tipo IN ('cliente', 'profissional', 'empresa', 'administrador')),
        UNIQUE KEY uq_usuarios_email (email),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE usuarios');
  }
}
