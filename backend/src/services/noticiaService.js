const noticiaRepository = require(
    "../repositories/noticiaRepository"
);

async function listarTodas() {

    return await noticiaRepository.listarTodas();

}

async function criar(dados) {

    const texto =
        dados.texto?.trim();

    if (!texto) {

        const erro = new Error(
            "A notícia é obrigatória."
        );

        erro.statusCode = 400;

        throw erro;

    }

    if (texto.length > 200) {

        const erro = new Error(
            "A notícia deve ter no máximo 200 caracteres."
        );

        erro.statusCode = 400;

        throw erro;

    }

    return await noticiaRepository.criar({
        texto
    });

}

async function excluir(id) {

    const noticia =
        await noticiaRepository.excluir(id);

    if (!noticia) {

        const erro = new Error(
            "Notícia não encontrada."
        );

        erro.statusCode = 404;

        throw erro;

    }

    return noticia;

}

module.exports = {
    listarTodas,
    criar,
    excluir
};