import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfissionaisSchema1760101000000 implements MigrationInterface {
  name = 'ProfissionaisSchema1760101000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profissionais (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        descricao VARCHAR(280) NOT NULL,
        bairro VARCHAR(120) NOT NULL,
        preco_inicial DECIMAL(10, 2) NULL,
        verificado TINYINT(1) NOT NULL DEFAULT 0,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uq_profissionais_usuario (usuario_id),
        KEY idx_profissionais_bairro (bairro),
        CONSTRAINT fk_profissionais_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT chk_profissionais_preco_inicial
          CHECK (preco_inicial IS NULL OR preco_inicial >= 0),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE profissional_servicos (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        profissional_id INT UNSIGNED NOT NULL,
        nome VARCHAR(90) NOT NULL,
        preco_inicial DECIMAL(10, 2) NULL,
        ativo TINYINT(1) NOT NULL DEFAULT 1,
        criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_profissional_servicos_profissional (profissional_id),
        KEY idx_profissional_servicos_nome (nome),
        CONSTRAINT fk_profissional_servicos_profissional
          FOREIGN KEY (profissional_id) REFERENCES profissionais (id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT chk_profissional_servicos_preco_inicial
          CHECK (preco_inicial IS NULL OR preco_inicial >= 0),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE profissional_servicos');
    await queryRunner.query('DROP TABLE profissionais');
  }
}
