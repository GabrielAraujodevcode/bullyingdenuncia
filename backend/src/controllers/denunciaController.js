const denunciaService = require(
    "../services/denunciaService"
);

async function criarDenuncia(req, res) {
    try {
        const denuncia = await denunciaService.criar(
            req.body
        );

        return res.status(201).json({
            mensagem:
                "Denúncia registrada com sucesso.",
            denuncia
        });
    } catch (erro) {
        const statusCode =
            erro.statusCode || 500;

        return res.status(statusCode).json({
            erro: erro.message
        });
    }
}
async function buscarDenunciaPorProtocolo(req, res) {
    try {
        const { protocolo } = req.params;

        const denuncia =
            await denunciaService.buscarPorProtocolo(
                protocolo
            );

        return res.status(200).json({
            mensagem: "Denúncia encontrada.",
            denuncia
        });
    } catch (erro) {
        const statusCode = erro.statusCode || 500;

        return res.status(statusCode).json({
            erro: erro.message
        });
    }
}

async function listarDenuncias(req, res) {
    try {
        const denuncias =
            await denunciaService.listarTodas();

        return res.status(200).json({
            quantidade: denuncias.length,
            denuncias
        });
    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
}
async function atualizarDenuncia(req, res) {
    try {
        const { id } = req.params;

        const denuncia =
            await denunciaService.atualizar(
                id,
                req.body
            );

        return res.status(200).json({
            mensagem:
                "Denúncia atualizada com sucesso.",
            denuncia
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
    criarDenuncia,
    buscarDenunciaPorProtocolo,
    listarDenuncias,
    atualizarDenuncia
};

        