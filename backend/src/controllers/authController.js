const authService = require(
    "../services/authService"
);

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const resultado =
            await authService.login(
                email,
                senha
            );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            token: resultado.token,
            administrador:
                resultado.administrador
        });

    } catch (erro) {
        const statusCode =
            erro.statusCode || 500;

        return res.status(statusCode).json({
            erro: erro.message
        });
    }
}

module.exports = {
    login
};