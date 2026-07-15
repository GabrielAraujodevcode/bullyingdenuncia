const pool = require("../config/database");

async function listarTodas() {

    const comandoSql = `
        SELECT
            id,
            texto,
            criado_em,
            atualizado_em
        FROM noticias
        ORDER BY criado_em DESC;
    `;

    const resultado = await pool.query(
        comandoSql
    );

    return resultado.rows;

}

async function criar(dados) {

    const { texto } = dados;

    const comandoSql = `
        INSERT INTO noticias (
            texto
        )
        VALUES ($1)
        RETURNING *;
    `;

    const resultado = await pool.query(
        comandoSql,
        [texto]
    );

    return resultado.rows[0];

}

async function excluir(id) {

    const comandoSql = `
        DELETE FROM noticias
        WHERE id = $1
        RETURNING *;
    `;

    const resultado = await pool.query(
        comandoSql,
        [id]
    );

    return resultado.rows[0];

}

module.exports = {
    listarTodas,
    criar,
    excluir
};