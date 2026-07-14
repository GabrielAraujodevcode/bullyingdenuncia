CREATE TABLE denuncias (
    id BIGSERIAL PRIMARY KEY,
    protocolo VARCHAR(30) UNIQUE NOT NULL,
    usuario_anonimo VARCHAR(50) NOT NULL,
    local_ocorrencia VARCHAR(50) NOT NULL,
    agressor_descricao TEXT NOT NULL,
    tipo_bullying VARCHAR(30) NOT NULL,
    relato TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'recebida',
    mensagem_secretaria TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE administradores (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);