import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientesEnderecosFavoritosSchema1760105000000
  implements MigrationInterface
{
  name = 'ClientesEnderecosFavoritosSchema1760105000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cliente_perfis (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        bairro_principal VARCHAR(120) NULL,
        cidade VARCHAR(120) NULL,
        uf CHAR(2) NULL,
        observacoes VARCHAR(280) NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_cliente_perfis_usuario (usuario_id),
        CONSTRAINT fk_cliente_perfis_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE cliente_enderecos (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        usuario_id INT UNSIGNED NOT NULL,
        apelido VARCHAR(80) NOT NULL,
        cep VARCHAR(12) NULL,
        logradouro VARCHAR(160) NOT NULL,
        numero VARCHAR(24) NOT NULL,
        complemento VARCHAR(120) NULL,
        bairro VARCHAR(120) NOT NULL,
        cidade VARCHAR(120) NOT NULL,
        uf CHAR(2) NOT NULL,
        principal TINYINT NOT NULL DEFAULT 0,
        ativo TINYINT NOT NULL DEFAULT 1,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        atualizado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        INDEX idx_cliente_enderecos_usuario (usuario_id),
        CONSTRAINT fk_cliente_enderecos_usuario
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await queryRunner.query(`
      CREATE TABLE favoritos_profissionais (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        cliente_id INT UNSIGNED NOT NULL,
        profissional_id INT UNSIGNED NOT NULL,
        criado_em TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        UNIQUE INDEX uq_favoritos_cliente_profissional (cliente_id, profissional_id),
        INDEX idx_favoritos_profissional (profissional_id),
        CONSTRAINT fk_favoritos_cliente
          FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
          ON DELETE RESTRICT,
        CONSTRAINT fk_favoritos_profissional
          FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
          ON DELETE RESTRICT,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE favoritos_profissionais');
    await queryRunner.query('DROP TABLE cliente_enderecos');
    await queryRunner.query('DROP TABLE cliente_perfis');
  }
}
