import { MigrationInterface, QueryRunner } from 'typeorm';

export class DisponibilidadeProfissionalSchema1760106000000
  implements MigrationInterface
{
  name = 'DisponibilidadeProfissionalSchema1760106000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profissional_disponibilidades (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        profissional_id INT UNSIGNED NOT NULL,
        dia_semana TINYINT UNSIGNED NOT NULL,
        hora_inicio VARCHAR(5) NOT NULL,
        hora_fim VARCHAR(5) NOT NULL,
        ativo TINYINT NOT NULL DEFAULT 1,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_profissional_disponibilidades_profissional (profissional_id, dia_semana),
        CONSTRAINT chk_profissional_disponibilidades_dia CHECK (dia_semana BETWEEN 0 AND 6),
        CONSTRAINT chk_profissional_disponibilidades_horas CHECK (hora_inicio < hora_fim),
        CONSTRAINT fk_profissional_disponibilidades_profissional
          FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE profissional_disponibilidades');
  }
}
