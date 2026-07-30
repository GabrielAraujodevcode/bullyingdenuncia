const API_URL = "https://bullyingdenuncia-api.onrender.com/api";

function obterToken() {
    return localStorage.getItem("tokenAdministrador");
}

export function obterHeaders(autenticado = false) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (autenticado) {
        const token = obterToken();

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    return headers;
}

async function processarResposta(resposta) {
    let resultado = {};

    try {
        resultado = await resposta.json();
    } catch {
        resultado = {};
    }

    if (!resposta.ok) {
        const erro = new Error(
            resultado.erro ||
            resultado.mensagem ||
            "Não foi possível concluir a operação."
        );

        erro.status = resposta.status;
        erro.dados = resultado;

        throw erro;
    }

    return resultado;
}

async function requisicao(
    caminho,
    {
        method = "GET",
        body,
        autenticado = false,
    } = {}
) {
    const resposta = await fetch(`${API_URL}${caminho}`, {
        method,
        headers: obterHeaders(autenticado),
        ...(body !== undefined
            ? { body: JSON.stringify(body) }
            : {}),
    });

    return processarResposta(resposta);
}

export const api = {

    // 
    // AUTH
    // 

    login(email, senha) {
        return requisicao("/auth/login", {
            method: "POST",
            body: { email, senha },
        });
    },

    // 
    // DENÚNCIAS
    // 

    criarDenuncia(dados) {
        return requisicao("/denuncias", {
            method: "POST",
            body: dados,
        });
    },

    listarDenuncias() {
        return requisicao("/denuncias", {
            autenticado: true,
        });
    },

    buscarDenunciaPorProtocolo(protocolo, autenticado = false) {
        return requisicao(
            `/denuncias/protocolo/${encodeURIComponent(protocolo)}`,
            {
                autenticado,
            }
        );
    },

    atualizarDenuncia(id, dados) {
        return requisicao(`/denuncias/${id}`, {
            method: "PATCH",
            body: dados,
            autenticado: true,
        });
    },

    excluirDenuncia(id) {
        return requisicao(`/denuncias/${id}`, {
            method: "DELETE",
            autenticado: true,
        });
    },

   
    // COMENTÁRIOS
    

    listarComentarios() {
        return requisicao("/comentarios");
    },

    criarComentario(dados) {
        return requisicao("/comentarios", {
            method: "POST",
            body: dados,
        });
    },

    excluirComentario(id) {
        return requisicao(`/comentarios/${id}`, {
            method: "DELETE",
            autenticado: true,
        });
    },

   
    // NOTÍCIAS
    

    listarNoticias() {
        return requisicao("/noticias");
    },

    criarNoticia(dados) {
        return requisicao("/noticias", {
            method: "POST",
            body: dados,
            autenticado: true,
        });
    },

    excluirNoticia(id) {
        return requisicao(`/noticias/${id}`, {
            method: "DELETE",
            autenticado: true,
        });
    },
};

export {
    API_URL,
    obterToken,
};