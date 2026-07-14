const API_URL = "http://localhost:3000/api";

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
    }

};