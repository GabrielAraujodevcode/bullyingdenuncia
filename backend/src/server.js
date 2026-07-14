require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        const resultado = await pool.query(
            "SELECT NOW() AS horario_banco"
        );

        console.log("Banco de dados conectado.");
        console.log(
            "Horário do banco:",
            resultado.rows[0].horario_banco
        );

        app.listen(PORT, () => {
            console.log(
                `Servidor rodando em http://localhost:${PORT}`
            );
        });
    } catch (erro) {
        console.error(
            "Não foi possível conectar ao banco de dados."
        );

        console.error(erro.message);

        process.exit(1);
    }
}

iniciarServidor();