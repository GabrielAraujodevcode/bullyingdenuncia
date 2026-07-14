const pool = require("../config/database");

async function criar(dados) {
    const {
        protocolo,
        usuarioAnonimo,
        localOcorrencia,
        agressorDescricao,
        tipoBullying,
        relato
    } = dados;

    const comandoSql = `
        INSERT INTO denuncias (
            protocolo,
            usuario_anonimo,
            local_ocorrencia,
            agressor_descricao,
            tipo_bullying,
            relato
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const valores = [
        protocolo,
        usuarioAnonimo,
        localOcorrencia,
        agressorDescricao,
        tipoBullying,
        relato
    ];

    const resultado = await pool.query(
        comandoSql,
        valores
    );

    return resultado.rows[0];
}

async function buscarPorProtocolo(protocolo) {
    const comandoSql = `
        SELECT
            id,
            protocolo,
            usuario_anonimo,
            local_ocorrencia,
            tipo_bullying,
            relato,
            status,
            mensagem_secretaria,
            criado_em,
            atualizado_em
        FROM denuncias
        WHERE protocolo = $1;
    `;

    const resultado = await pool.query(
        comandoSql,
        [protocolo]
    );

    return resultado.rows[0];
}
async function listarTodas() {
    const comandoSql = `
        SELECT
            id,
            protocolo,
            usuario_anonimo,
            local_ocorrencia,
            agressor_descricao,
            tipo_bullying,
            relato,
            status,
            mensagem_secretaria,
            criado_em,
            atualizado_em
        FROM denuncias
        ORDER BY criado_em DESC;
    `;

    const resultado = await pool.query(comandoSql);

    return resultado.rows;
}

async function atualizar(id, dados) {
    const {
        status,
        mensagem
    } = dados;

    const comandoSql = `
        UPDATE denuncias
        SET
            status = $1,
            mensagem_secretaria = $2,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
    `;

    const valores = [
        status,
        mensagem,
        id
    ];

    const resultado = await pool.query(
        comandoSql,
        valores
    );

    return resultado.rows[0];
}

module.exports = {
    criar,
    buscarPorProtocolo,
    listarTodas,
    atualizar
};