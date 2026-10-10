import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminUsuariosSchema1760110000000 implements MigrationInterface {
  name = 'AdminUsuariosSchema1760110000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE admin_auditoria (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        ator_id INT UNSIGNED NOT NULL,
        acao VARCHAR(60) NOT NULL,
        alvo_tipo VARCHAR(60) NOT NULL,
        alvo_id INT UNSIGNED NOT NULL,
        detalhe VARCHAR(600) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        INDEX idx_admin_auditoria_ator_criado (ator_id, criado_em),
        INDEX idx_admin_auditoria_alvo (alvo_tipo, alvo_id),
        CONSTRAINT chk_admin_auditoria_acao
          CHECK (acao IN ('usuario_ativado', 'usuario_desativado', 'administrador_criado')),
        CONSTRAINT fk_admin_auditoria_ator
          FOREIGN KEY (ator_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE admin_auditoria');
  }
}
