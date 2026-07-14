const pool = require("../config/database");

async function listarTodos() {

    const comandoSql = `
        SELECT
            id,
            usuario,
            texto,
            criado_em
        FROM comentarios
        ORDER BY criado_em DESC;
    `;

    const resultado = await pool.query(
        comandoSql
    );

    return resultado.rows;
}

async function criar(dados) {

    const {
        usuario,
        texto
    } = dados;

    const comandoSql = `
        INSERT INTO comentarios (
            usuario,
            texto
        )
        VALUES ($1, $2)
        RETURNING *;
    `;

    const resultado = await pool.query(
        comandoSql,
        [
            usuario,
            texto
        ]
    );

    return resultado.rows[0];
}

async function excluir(id) {

    const comandoSql = `
        DELETE FROM comentarios
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
    listarTodos,
    criar,
    excluir
};