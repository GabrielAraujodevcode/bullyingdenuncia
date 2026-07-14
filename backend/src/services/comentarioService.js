const comentarioRepository = require(
    "../repositories/comentarioRepository"
);

async function listarTodos() {

    return await comentarioRepository
        .listarTodos();

}

async function criar(dados) {

    const usuario =
        dados.usuario?.trim();

    const texto =
        dados.texto?.trim();

    if (!usuario) {

        const erro = new Error(
            "O nome do usuário é obrigatório."
        );

        erro.statusCode = 400;

        throw erro;

    }

    if (!texto) {

        const erro = new Error(
            "O comentário é obrigatório."
        );

        erro.statusCode = 400;

        throw erro;

    }

    if (usuario.length > 30) {

        const erro = new Error(
            "O nome do usuário deve ter no máximo 30 caracteres."
        );

        erro.statusCode = 400;

        throw erro;

    }

    if (texto.length > 150) {

        const erro = new Error(
            "O comentário deve ter no máximo 150 caracteres."
        );

        erro.statusCode = 400;

        throw erro;

    }

    return await comentarioRepository.criar({
        usuario,
        texto
    });

}

async function excluir(id) {

    const comentario =
        await comentarioRepository.excluir(id);

    if (!comentario) {

        const erro = new Error(
            "Comentário não encontrado."
        );

        erro.statusCode = 404;

        throw erro;

    }

    return comentario;

}

module.exports = {
    listarTodos,
    criar,
    excluir
};