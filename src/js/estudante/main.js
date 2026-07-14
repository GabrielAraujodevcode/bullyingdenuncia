const API_URL = "http://localhost:3000/api";

async function buscarDenunciaPorProtocolo(
    protocolo
) {
    const resposta = await fetch(
        `${API_URL}/denuncias/protocolo/${encodeURIComponent(protocolo)}`
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            resultado.erro ||
            "Não foi possível localizar a denúncia."
        );
    }

    return resultado.denuncia;
}

function normalizarStatus(statusBanco) {

    const status = statusBanco
        ?.trim()
        .toLowerCase();

    if (
        status === "recebida" ||
        status === "em análise" ||
        status === "em_analise"
    ) {
        return "Em análise";
    }

    if (
        status === "em andamento" ||
        status === "em_andamento" ||
        status === "em acompanhamento" ||
        status === "em_acompanhamento"
    ) {
        return "Em andamento";
    }

    if (
        status === "concluída" ||
        status === "concluida" ||
        status === "resolvida"
    ) {
        return "Concluída";
    }

    return "Em análise";
}

function mostrarErro(mensagem) {

    const elementos =
        window.DenunciaEstudanteElementos;

    elementos.protocolo.textContent =
        "Protocolo não encontrado";

    elementos.status.textContent =
        "Indisponível";

    elementos.mensagem.textContent =
        mensagem;

    elementos.status.classList.remove(
        "statusAnalise",
        "statusAndamento",
        "statusConcluida"
    );

    elementos.etapas.forEach((etapa) => {
        etapa.classList.remove("ativa");
    });

    elementos.linhaEtapa1.classList.remove(
        "ativa"
    );

    elementos.linhaEtapa2.classList.remove(
        "ativa"
    );
}

async function carregarDenunciaEstudante() {

    const elementos =
        window.DenunciaEstudanteElementos;

    const protocolo =
        sessionStorage.getItem(
            "protocoloConsulta"
        );

    if (!protocolo) {
        mostrarErro(
            "Nenhum protocolo foi informado."
        );

        return;
    }

    try {
        elementos.protocolo.textContent =
            protocolo;

        elementos.status.textContent =
            "Carregando...";

        elementos.mensagem.textContent =
            "Consultando as informações da denúncia.";

        const denuncia =
            await buscarDenunciaPorProtocolo(
                protocolo
            );

        const statusFormatado =
            normalizarStatus(
                denuncia.status
            );

        elementos.protocolo.textContent =
            denuncia.protocolo;

        elementos.status.textContent =
            statusFormatado;

        elementos.mensagem.textContent =
            denuncia.mensagem_secretaria ||
            "Ainda não existe uma mensagem da secretaria.";

        window.DenunciaEstudanteStatus
            .atualizarCor(statusFormatado);

        window.DenunciaEstudanteStatus
            .atualizarEtapas(statusFormatado);

    } catch (erro) {
        mostrarErro(erro.message);
    }
}

carregarDenunciaEstudante();