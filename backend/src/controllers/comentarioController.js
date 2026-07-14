const comentarioService = require(
    "../services/comentarioService"
);

async function listarComentarios(req, res) {

    try {

        const comentarios =
            await comentarioService.listarTodos();

        return res.status(200).json({
            comentarios
        });

    } catch (erro) {

        return res.status(500).json({
            erro: erro.message
        });

    }

}

async function criarComentario(req, res) {

    try {

        const comentario =
            await comentarioService.criar(
                req.body
            );

        return res.status(201).json({
            comentario
        });

    } catch (erro) {

        const statusCode =
            erro.statusCode || 500;

        return res.status(statusCode).json({
            erro: erro.message
        });

    }

}

async function excluirComentario(req, res) {

    try {

        const comentario =
            await comentarioService.excluir(
                req.params.id
            );

        return res.status(200).json({
            mensagem:
                "Comentário removido com sucesso.",
            comentario
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
    listarComentarios,
    criarComentario,
    excluirComentario
};