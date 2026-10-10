import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriasSchema1760102000000 implements MigrationInterface {
  name = 'CategoriasSchema1760102000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE categorias (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        nome VARCHAR(80) NOT NULL,
        ativo TINYINT NOT NULL DEFAULT 1,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_categorias_nome (nome),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      INSERT INTO categorias (nome, ativo)
      VALUES
        ('Eletrica', 1),
        ('Hidraulica', 1),
        ('Pintura', 1),
        ('Limpeza', 1),
        ('Manutencao', 1),
        ('Ar-condicionado', 1),
        ('Reformas', 1),
        ('Outros', 1)
    `);

    await queryRunner.query(`
      ALTER TABLE profissional_servicos
        ADD categoria_id INT UNSIGNED NULL AFTER profissional_id,
        ADD INDEX idx_profissional_servicos_categoria (categoria_id),
        ADD CONSTRAINT fk_profissional_servicos_categoria
          FOREIGN KEY (categoria_id) REFERENCES categorias(id)
          ON DELETE SET NULL
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE profissional_servicos
        DROP FOREIGN KEY fk_profissional_servicos_categoria
    `);
    await queryRunner.query(`
      ALTER TABLE profissional_servicos
        DROP INDEX idx_profissional_servicos_categoria,
        DROP COLUMN categoria_id
    `);
    await queryRunner.query('DROP TABLE categorias');
  }
}
