const pool = require("../config/database");

async function buscarPorEmail(email) {

    const comandoSql = `
        SELECT
            id,
            nome,
            email,
            senha_hash,
            ativo
        FROM administradores
        WHERE email = $1;
    `;

    const resultado = await pool.query(
        comandoSql,
        [email]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarPorEmail
};