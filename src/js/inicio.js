const API_URL =
    "https://bullyingdenuncia-api.onrender.com/api";

/* ==========================
ELEMENTOS DA PÁGINA
========================== */

const abrirFormulario =
    document.getElementById("abrirFormulario");

const fecharFormularioBotao =
    document.getElementById("fecharFormulario");

const modalFormulario =
    document.getElementById("modal");

const formulario =
    document.getElementById("formDenuncia");

const modalProtocolo =
    document.getElementById("modalProtocolo");

const fecharProtocolo =
    document.getElementById("fecharProtocolo");

const confirmarProtocolo =
    document.getElementById("confirmarProtocolo");

const codigoProtocolo =
    document.getElementById("codigoProtocolo");

const campoUsuarioAnonimo =
    document.getElementById("usuarioAnonimo");

const campoLocalOcorrencia =
    document.getElementById("localOcorrencia");

const campoAgressorDescricao =
    document.getElementById("agressorDescricao");

const campoTipoBullying =
    document.getElementById("tipoBullying");

const campoRelato =
    document.getElementById("relato");

const botaoEnviar =
    formulario?.querySelector(".btnEnviar");


/* ==========================
VALIDAR ELEMENTOS
========================== */

const elementosObrigatorios = {
    abrirFormulario,
    fecharFormularioBotao,
    modalFormulario,
    formulario,
    modalProtocolo,
    fecharProtocolo,
    confirmarProtocolo,
    codigoProtocolo,
    campoUsuarioAnonimo,
    campoLocalOcorrencia,
    campoAgressorDescricao,
    campoTipoBullying,
    campoRelato,
    botaoEnviar
};

const elementosAusentes =
    Object.entries(elementosObrigatorios)
        .filter(([, elemento]) => !elemento)
        .map(([nome]) => nome);

if (elementosAusentes.length > 0) {
    console.error(
        "Elementos não encontrados no HTML:",
        elementosAusentes
    );

    throw new Error(
        "O formulário não foi carregado corretamente."
    );
}


/* ==========================
ABRIR E FECHAR FORMULÁRIO
========================== */

abrirFormulario.addEventListener(
    "click",
    () => {
        modalFormulario.classList.add("ativo");
    }
);

function fecharJanelaFormulario() {
    modalFormulario.classList.remove("ativo");
}

fecharFormularioBotao.addEventListener(
    "click",
    fecharJanelaFormulario
);

modalFormulario.addEventListener(
    "click",
    (evento) => {
        if (evento.target === modalFormulario) {
            fecharJanelaFormulario();
        }
    }
);


/* ==========================
CAPTURAR DADOS
========================== */

function obterDadosFormulario() {
    return {
        usuarioAnonimo:
            campoUsuarioAnonimo.value.trim(),

        localOcorrencia:
            campoLocalOcorrencia.value,

        agressorDescricao:
            campoAgressorDescricao.value.trim(),

        tipoBullying:
            campoTipoBullying.value,

        relato:
            campoRelato.value.trim()
    };
}


/* ==========================
VALIDAR DADOS
========================== */

function validarDados(dados) {
    if (
        !dados.usuarioAnonimo ||
        !dados.localOcorrencia ||
        !dados.agressorDescricao ||
        !dados.tipoBullying ||
        !dados.relato
    ) {
        throw new Error(
            "Preencha todos os campos da denúncia."
        );
    }
}


/* ==========================
ENVIAR PARA A API
========================== */

async function enviarDenuncia(dados) {
    const resposta = await fetch(
        `${API_URL}/denuncias`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)
        }
    );

    let resultado;

    try {
        resultado = await resposta.json();
    } catch {
        throw new Error(
            "A API retornou uma resposta inválida."
        );
    }

    if (!resposta.ok) {
        throw new Error(
            resultado.erro ||
            "Não foi possível enviar a denúncia."
        );
    }

    return resultado;
}


/* ==========================
SUBMIT DO FORMULÁRIO
========================== */

formulario.addEventListener(
    "submit",
    async (evento) => {
        evento.preventDefault();

        try {
            const dados =
                obterDadosFormulario();

            validarDados(dados);

            botaoEnviar.disabled = true;
            botaoEnviar.textContent =
                "Enviando...";

            const resultado =
                await enviarDenuncia(dados);

            if (!resultado.denuncia?.protocolo) {
                throw new Error(
                    "O protocolo não foi retornado pela API."
                );
            }

            codigoProtocolo.textContent =
                resultado.denuncia.protocolo;

            fecharJanelaFormulario();

            modalProtocolo.classList.add(
                "ativo"
            );

            formulario.reset();

        } catch (erro) {
            console.error(erro);

            alert(
                erro.message ||
                "Não foi possível enviar a denúncia."
            );

        } finally {
            botaoEnviar.disabled = false;

            botaoEnviar.textContent =
                "Enviar Denúncia";
        }
    }
);


/* ==========================
FECHAR PROTOCOLO
========================== */

function encerrarProtocolo() {
    modalProtocolo.classList.remove("ativo");
}

fecharProtocolo.addEventListener(
    "click",
    encerrarProtocolo
);

confirmarProtocolo.addEventListener(
    "click",
    encerrarProtocolo
);

modalProtocolo.addEventListener(
    "click",
    (evento) => {
        if (evento.target === modalProtocolo) {
            encerrarProtocolo();
        }
    }
);
