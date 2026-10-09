CREATE DATABASE IF NOT EXISTS conectalar
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE conectalar;

CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  telefone VARCHAR(30) NULL,
  senha_hash VARCHAR(255) NOT NULL,
  tipo ENUM('cliente', 'profissional', 'empresa', 'administrador') NOT NULL,
  bairro VARCHAR(100) NULL,
  cidade VARCHAR(100) NULL,
  estado CHAR(2) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email),
  KEY idx_usuarios_localizacao (tipo, estado, cidade, bairro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profissionais (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id BIGINT UNSIGNED NOT NULL,
  descricao TEXT NULL,
  preco_inicial DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_profissionais_usuario (usuario_id),
  CONSTRAINT fk_profissionais_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT chk_profissionais_preco_inicial CHECK (preco_inicial >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categorias (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NULL,
  ativa TINYINT(1) NOT NULL DEFAULT 1,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_nome (nome),
  KEY idx_categorias_ativa_nome (ativa, nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profissional_categorias (
  profissional_id BIGINT UNSIGNED NOT NULL,
  categoria_id BIGINT UNSIGNED NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (profissional_id, categoria_id),
  KEY idx_profissional_categorias_categoria (categoria_id, profissional_id),
  CONSTRAINT fk_profissional_categorias_profissional
    FOREIGN KEY (profissional_id) REFERENCES profissionais (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_profissional_categorias_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solicitacoes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente_id BIGINT UNSIGNED NOT NULL,
  profissional_id BIGINT UNSIGNED NOT NULL,
  categoria_id BIGINT UNSIGNED NOT NULL,
  descricao TEXT NOT NULL,
  data_servico DATE NOT NULL,
  horario_servico TIME NOT NULL,
  preco_inicial DECIMAL(10, 2) NOT NULL,
  status ENUM(
    'aguardando_resposta',
    'aceita_agendada',
    'recusada',
    'cancelada',
    'conclusao_confirmada'
  ) NOT NULL DEFAULT 'aguardando_resposta',
  endereco_cep VARCHAR(12) NULL,
  endereco_logradouro VARCHAR(160) NULL,
  endereco_numero VARCHAR(20) NULL,
  endereco_complemento VARCHAR(100) NULL,
  endereco_bairro VARCHAR(100) NULL,
  endereco_cidade VARCHAR(100) NULL,
  endereco_estado CHAR(2) NULL,
  aceita_em DATETIME NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_solicitacoes_cliente (cliente_id, criado_em),
  KEY idx_solicitacoes_profissional_status (profissional_id, status, data_servico),
  KEY idx_solicitacoes_categoria (categoria_id),
  CONSTRAINT fk_solicitacoes_cliente
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_solicitacoes_profissional
    FOREIGN KEY (profissional_id) REFERENCES profissionais (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_solicitacoes_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_solicitacoes_preco_inicial CHECK (preco_inicial >= 0),
  CONSTRAINT chk_solicitacoes_aceite_registrado CHECK (
    status NOT IN ('aceita_agendada', 'conclusao_confirmada') OR aceita_em IS NOT NULL
  )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS avaliacoes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  solicitacao_id BIGINT UNSIGNED NOT NULL,
  avaliador_id BIGINT UNSIGNED NOT NULL,
  avaliado_id BIGINT UNSIGNED NOT NULL,
  nota TINYINT UNSIGNED NOT NULL,
  comentario TEXT NULL,
  foto_url VARCHAR(2048) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_avaliacoes_solicitacao_avaliador (solicitacao_id, avaliador_id),
  KEY idx_avaliacoes_avaliado (avaliado_id, criado_em),
  CONSTRAINT fk_avaliacoes_solicitacao
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_avaliacoes_avaliador
    FOREIGN KEY (avaliador_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_avaliacoes_avaliado
    FOREIGN KEY (avaliado_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_avaliacoes_nota CHECK (nota BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS favoritos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente_id BIGINT UNSIGNED NOT NULL,
  profissional_id BIGINT UNSIGNED NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_favoritos_cliente_profissional (cliente_id, profissional_id),
  KEY idx_favoritos_profissional (profissional_id),
  CONSTRAINT fk_favoritos_cliente
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_favoritos_profissional
    FOREIGN KEY (profissional_id) REFERENCES profissionais (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mensagens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  solicitacao_id BIGINT UNSIGNED NOT NULL,
  remetente_id BIGINT UNSIGNED NOT NULL,
  conteudo TEXT NOT NULL,
  lida TINYINT(1) NOT NULL DEFAULT 0,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_mensagens_solicitacao_data (solicitacao_id, criado_em),
  KEY idx_mensagens_remetente_lida (remetente_id, lida),
  CONSTRAINT fk_mensagens_solicitacao
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacoes (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_mensagens_remetente
    FOREIGN KEY (remetente_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS documentos_verificacao (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  profissional_id BIGINT UNSIGNED NOT NULL,
  tipo_documento VARCHAR(80) NOT NULL,
  arquivo_url VARCHAR(2048) NOT NULL,
  status ENUM('pendente', 'aprovado', 'recusado') NOT NULL DEFAULT 'pendente',
  observacao_admin VARCHAR(1000) NULL,
  analisado_em DATETIME NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_documentos_profissional_status (profissional_id, status),
  KEY idx_documentos_status_criado (status, criado_em),
  CONSTRAINT fk_documentos_profissional
    FOREIGN KEY (profissional_id) REFERENCES profissionais (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
