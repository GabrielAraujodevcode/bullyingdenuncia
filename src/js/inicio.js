const API_URL = "https://bullyingdenuncia-api.onrender.com/api";

const abrir = document.getElementById("abrirFormulario");
const fechar = document.getElementById("fecharFormulario");
const modal = document.getElementById("modal");

const formulario = document.getElementById("formDenuncia");

const modalProtocolo =
    document.getElementById("modalProtocolo");

const fecharProtocolo =
    document.getElementById("fecharProtocolo");

const confirmarProtocolo =
    document.getElementById("confirmarProtocolo");

const codigoProtocolo =
    document.getElementById("codigoProtocolo");

const botaoEnviar =
    formulario.querySelector(".btnEnviar");


/* ==========================
ABRIR FORMULÁRIO
========================== */

abrir.addEventListener("click", () => {
    modal.classList.add("ativo");
});


/* ==========================
FECHAR FORMULÁRIO
========================== */

function fecharFormulario() {
    modal.classList.remove("ativo");
}

fechar.addEventListener("click", fecharFormulario);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        fecharFormulario();
    }
});


/* ==========================
CAPTURAR DADOS
========================== */

function obterDadosFormulario() {
    return {
        usuarioAnonimo:
            document
                .getElementById("usuarioAnonimo")
                .value
                .trim(),

        localOcorrencia:
            document
                .getElementById("localOcorrencia")
                .value,

        agressorDescricao:
            document
                .getElementById("agressorDescricao")
                .value
                .trim(),

        tipoBullying:
            document
                .getElementById("tipoBullying")
                .value,

        relato:
            document
                .getElementById("relato")
                .value
                .trim()
    };
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

    const resultado = await resposta.json();

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

        const dados = obterDadosFormulario();

        try {
            botaoEnviar.disabled = true;
            botaoEnviar.textContent = "Enviando...";

            const resultado =
                await enviarDenuncia(dados);

            codigoProtocolo.textContent =
                resultado.denuncia.protocolo;

            fecharFormulario();

            modalProtocolo.classList.add("ativo");

            formulario.reset();
        } catch (erro) {
            alert(erro.message);
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
