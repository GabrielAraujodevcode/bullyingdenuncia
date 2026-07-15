const noticiaService = require(
    "../services/noticiaService"
);

async function listarNoticias(req, res) {
    try {
        const noticias =
            await noticiaService.listarTodas();

        return res.status(200).json({
            noticias
        });

    } catch (erro) {
        return res.status(500).json({
            erro: erro.message
        });
    }
}

async function criarNoticia(req, res) {
    try {
        const noticia =
            await noticiaService.criar(
                req.body
            );

        return res.status(201).json({
            mensagem:
                "Notícia publicada com sucesso.",
            noticia
        });

    } catch (erro) {
        const statusCode =
            erro.statusCode || 500;

        return res.status(statusCode).json({
            erro: erro.message
        });
    }
}

async function excluirNoticia(req, res) {
    try {
        const noticia =
            await noticiaService.excluir(
                req.params.id
            );

        return res.status(200).json({
            mensagem:
                "Notícia removida com sucesso.",
            noticia
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
    listarNoticias,
    criarNoticia,
    excluirNoticia
};