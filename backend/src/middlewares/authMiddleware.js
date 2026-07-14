const jwt = require("jsonwebtoken");

function autenticarAdministrador(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            erro: "Token de autenticação não informado."
        });
    }

    const partes = authorization.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {
        return res.status(401).json({
            erro: "Formato do token inválido."
        });
    }

    const token = partes[1];

    try {
        const dadosToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.administrador = dadosToken;

        next();
    } catch (erro) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }
}

module.exports = {
    autenticarAdministrador
};