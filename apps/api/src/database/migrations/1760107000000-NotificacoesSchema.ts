import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificacoesSchema1760107000000 implements MigrationInterface {
  name = 'NotificacoesSchema1760107000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE notificacoes (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        tipo VARCHAR(40) NOT NULL,
        titulo VARCHAR(120) NOT NULL,
        mensagem VARCHAR(240) NOT NULL,
        recurso_tipo VARCHAR(40) NULL,
        recurso_id INT UNSIGNED NULL,
        lida TINYINT NOT NULL DEFAULT 0,
        lida_em TIMESTAMP(6) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_notificacoes_usuario_lida (usuario_id, lida, criado_em),
        CONSTRAINT fk_notificacoes_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE notificacoes');
  }
}
