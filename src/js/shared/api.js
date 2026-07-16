const API_URL = "https://bullyingdenuncia-api.onrender.com/api";

function obterHeaders() {

    const token =
        localStorage.getItem(
            "tokenAdministrador"
        );

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }

    return headers;

}
function verificarSessaoExpirada(
    resposta,
    resultado
) {

    if (resposta.status === 401) {

        localStorage.removeItem(
            "tokenAdministrador"
        );

        localStorage.removeItem(
            "administrador"
        );

        alert(
            resultado.erro ||
            "Sua sessão expirou. Faça login novamente."
        );

        window.location.replace(
            "login.html"
        );

        return true;
    }

    return false;
}

window.Api = {

    /* ==========================
       DENÚNCIAS
    ========================== */

    async listarDenuncias() {

        const resposta = await fetch(
            `${API_URL}/denuncias`,
            {
                headers: obterHeaders()
            }
        );

        const resultado = await resposta.json();

        if (
    verificarSessaoExpirada(
        resposta,
        resultado
    )
) {
    return [];
}

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                "Erro ao listar denúncias."
            );

        }

        return resultado.denuncias;

    },


    async buscarDenuncia(protocolo) {

        const resposta = await fetch(
            `${API_URL}/denuncias/protocolo/${encodeURIComponent(protocolo)}`,
            {
                headers: obterHeaders()
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                "Denúncia não encontrada."
            );

        }

        return resultado.denuncia;

    },


    async atualizarDenuncia(id, dados) {

        const resposta = await fetch(
            `${API_URL}/denuncias/${id}`,
            {
                method: "PATCH",

                headers: obterHeaders(),

                body: JSON.stringify(dados)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                "Não foi possível atualizar a denúncia."
            );

        }

        return resultado.denuncia;

    },


    /* ==========================
       COMENTÁRIOS
    ========================== */

    async listarComentarios() {

        const resposta = await fetch(
            `${API_URL}/comentarios`
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                "Não foi possível carregar os comentários."
            );

        }

        return resultado.comentarios;

    },


    async criarComentario(dados) {

        const resposta = await fetch(
            `${API_URL}/comentarios`,
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
                "Não foi possível publicar o comentário."
            );

        }

        return resultado.comentario;

    },


    async excluirComentario(id) {

        const resposta = await fetch(
            `${API_URL}/comentarios/${id}`,
            {
                method: "DELETE",

                headers: obterHeaders()
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {

            throw new Error(
                resultado.erro ||
                "Não foi possível excluir o comentário."
            );

        }

        return resultado.comentario;

    },

/* ==========================
   NOTÍCIAS
========================== */

async listarNoticias() {

    const resposta = await fetch(
        `${API_URL}/noticias`
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            resultado.erro ||
            "Não foi possível carregar as notícias."
        );

    }

    return resultado.noticias;

},


async criarNoticia(texto) {

    const resposta = await fetch(
        `${API_URL}/noticias`,
        {
            method: "POST",

            headers: obterHeaders(),

            body: JSON.stringify({
                texto
            })
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            resultado.erro ||
            "Não foi possível publicar a notícia."
        );

    }

    return resultado.noticia;

},


async excluirNoticia(id) {

    const resposta = await fetch(
        `${API_URL}/noticias/${id}`,
        {
            method: "DELETE",

            headers: obterHeaders()
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            resultado.erro ||
            "Não foi possível excluir a notícia."
        );

    }

    return resultado.noticia;

}

};