const crypto = require("crypto");

const denunciaRepository = require(
    "../repositories/denunciaRepository"
);

function gerarParteProtocolo() {
    return crypto
        .randomBytes(2)
        .toString("hex")
        .toUpperCase();
}

function gerarProtocolo() {
    return `DEN-${gerarParteProtocolo()}-${gerarParteProtocolo()}-${gerarParteProtocolo()}`;
}

function validarDados(dados) {
    const {
        usuarioAnonimo,
        localOcorrencia,
        agressorDescricao,
        tipoBullying,
        relato
    } = dados;

    if (
        !usuarioAnonimo ||
        !localOcorrencia ||
        !agressorDescricao ||
        !tipoBullying ||
        !relato
    ) {
        const erro = new Error(
            "Todos os campos da denúncia são obrigatórios."
        );

        erro.statusCode = 400;

        throw erro;
    }

    if (usuarioAnonimo.trim().length > 50) {
        const erro = new Error(
            "O usuário anônimo deve ter no máximo 50 caracteres."
        );

        erro.statusCode = 400;

        throw erro;
    }

    if (relato.trim().length < 10) {
        const erro = new Error(
            "O relato deve possuir pelo menos 10 caracteres."
        );

        erro.statusCode = 400;

        throw erro;
    }
}

async function criar(dados) {
    validarDados(dados);

    const protocolo = gerarProtocolo();

    const denuncia = await denunciaRepository.criar({
        protocolo,
        usuarioAnonimo: dados.usuarioAnonimo.trim(),
        localOcorrencia: dados.localOcorrencia.trim(),
        agressorDescricao:
            dados.agressorDescricao.trim(),
        tipoBullying: dados.tipoBullying.trim(),
        relato: dados.relato.trim()
    });

    return denuncia;
}
async function buscarPorProtocolo(protocolo) {
    if (!protocolo || protocolo.trim() === "") {
        const erro = new Error(
            "O protocolo é obrigatório."
        );

        erro.statusCode = 400;

        throw erro;
    }

    const protocoloFormatado = protocolo
        .trim()
        .toUpperCase();

    const denuncia =
        await denunciaRepository.buscarPorProtocolo(
            protocoloFormatado
        );

    if (!denuncia) {
        const erro = new Error(
            "Nenhuma denúncia foi encontrada com esse protocolo."
        );

        erro.statusCode = 404;

        throw erro;
    }

    return denuncia;
}
async function listarTodas() {
    const denuncias =
        await denunciaRepository.listarTodas();

    return denuncias;
}

function normalizarStatus(status) {
    const statusFormatado = status
        ?.trim()
        .toLowerCase();

    const statusPermitidos = {
        "recebida": "recebida",

        "em análise": "em_analise",
        "em_analise": "em_analise",

        "em andamento": "em_andamento",
        "em_andamento": "em_andamento",

        "concluída": "concluida",
        "concluida": "concluida"
    };

    return statusPermitidos[statusFormatado];
}

async function atualizar(id, dados) {
    const idNumerico = Number(id);

    if (
        !Number.isInteger(idNumerico) ||
        idNumerico <= 0
    ) {
        const erro = new Error(
            "O ID da denúncia é inválido."
        );

        erro.statusCode = 400;

        throw erro;
    }

    const statusNormalizado =
        normalizarStatus(dados.status);

    if (!statusNormalizado) {
        const erro = new Error(
            "O status informado é inválido."
        );

        erro.statusCode = 400;

        throw erro;
    }

    const mensagem =
        dados.mensagem?.trim();

    if (!mensagem) {
        const erro = new Error(
            "A mensagem para o estudante é obrigatória."
        );

        erro.statusCode = 400;

        throw erro;
    }

    if (mensagem.length > 300) {
        const erro = new Error(
            "A mensagem deve ter no máximo 300 caracteres."
        );

        erro.statusCode = 400;

        throw erro;
    }

    const denuncia =
        await denunciaRepository.atualizar(
            idNumerico,
            {
                status: statusNormalizado,
                mensagem
            }
        );

    if (!denuncia) {
        const erro = new Error(
            "Denúncia não encontrada."
        );

        erro.statusCode = 404;

        throw erro;
    }

    return denuncia;
}
module.exports = {
    criar,
    buscarPorProtocolo,
    listarTodas,
    atualizar
};
