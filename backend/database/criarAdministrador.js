require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("../src/config/database");

async function criarAdministrador() {
    try {
       const nome =
    process.env.ADMIN_NOME;

const email =
    process.env.ADMIN_EMAIL;

const senha =
    process.env.ADMIN_PASSWORD;

        const senhaHash = await bcrypt.hash(
            senha,
            10
        );

        const consultaExistente = await pool.query(
            `
                SELECT id
                FROM administradores
                WHERE email = $1;
            `,
            [email]
        );

        if (consultaExistente.rows.length > 0) {
            console.log(
                "Já existe um administrador com esse e-mail."
            );

            return;
        }

        const resultado = await pool.query(
            `
                INSERT INTO administradores (
                    nome,
                    email,
                    senha_hash
                )
                VALUES ($1, $2, $3)
                RETURNING
                    id,
                    nome,
                    email,
                    ativo,
                    criado_em;
            `,
            [
                nome,
                email,
                senhaHash
            ]
        );

        console.log(
            "Administrador criado com sucesso:"
        );

        console.log(resultado.rows[0]);

        console.log("\nDados para login:");
        console.log(`E-mail: ${email}`);
        console.log(`Senha: ${senha}`);

    } catch (erro) {
        console.error(
            "Erro ao criar administrador:"
        );

        console.error(erro.message);

    } finally {
        await pool.end();
    }
}

criarAdministrador();