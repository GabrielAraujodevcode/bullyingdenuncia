const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require(
    "../repositories/authRepository"
);

async function login(email, senha) {
    if (!email || !senha) {
        const erro = new Error(
            "E-mail e senha são obrigatórios."
        );

        erro.statusCode = 400;

        throw erro;
    }

    const emailFormatado =
        email.trim().toLowerCase();

    const administrador =
        await authRepository.buscarPorEmail(
            emailFormatado
        );

    if (!administrador) {
        const erro = new Error(
            "E-mail ou senha inválidos."
        );

        erro.statusCode = 401;

        throw erro;
    }

    if (!administrador.ativo) {
        const erro = new Error(
            "Esta conta está desativada."
        );

        erro.statusCode = 403;

        throw erro;
    }

    const senhaCorreta =
        await bcrypt.compare(
            senha,
            administrador.senha_hash
        );

    if (!senhaCorreta) {
        const erro = new Error(
            "E-mail ou senha inválidos."
        );

        erro.statusCode = 401;

        throw erro;
    }

    const token = jwt.sign(
        {
            id: administrador.id,
            email: administrador.email,
            nome: administrador.nome
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

    return {
        token,
        administrador: {
            id: administrador.id,
            nome: administrador.nome,
            email: administrador.email
        }
    };
}

module.exports = {
    login
};