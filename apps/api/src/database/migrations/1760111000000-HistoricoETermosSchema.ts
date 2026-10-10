import { MigrationInterface, QueryRunner } from 'typeorm';

export class HistoricoETermosSchema1760111000000 implements MigrationInterface {
  name = 'HistoricoETermosSchema1760111000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE termo_aceites (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        versao VARCHAR(40) NOT NULL,
        canal VARCHAR(30) NOT NULL DEFAULT 'api',
        aceito_em TIMESTAMP(6) NOT NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_termo_aceites_usuario_versao (usuario_id, versao),
        INDEX idx_termo_aceites_usuario (usuario_id, aceito_em),
        CONSTRAINT fk_termo_aceites_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE termo_aceites');
  }
}
