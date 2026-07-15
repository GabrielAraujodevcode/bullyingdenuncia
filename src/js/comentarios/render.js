/* ==========================
EXIBIÇÃO DOS COMENTÁRIOS
========================== */

window.ComentariosRender = {

    caixas: document.querySelectorAll(
        ".comentario1, .comentario2, .comentario3, .comentario4"
    ),

    comentarios: [],


    async carregarComentarios() {

        const comentarios =
            await window.ComentariosStorage.carregar();

        /*
        A API devolve os comentários do mais recente
        para o mais antigo.

        Como existem apenas quatro espaços na tela,
        mostramos somente os quatro primeiros.
        */

        this.comentarios =
            comentarios.slice(0, 4);

        return this.comentarios;
    },


    async mostrar() {

        try {

            const comentarios =
                await this.carregarComentarios();

            this.caixas.forEach(
                (caixa, indice) => {

                    const tituloUsuario =
                        caixa.querySelector("h3");

                    const textoComentario =
                        caixa.querySelector("p");

                    if (
                        !tituloUsuario ||
                        !textoComentario
                    ) {
                        return;
                    }

                    const comentarioAtual =
                        comentarios[indice];

                    if (comentarioAtual) {

                        tituloUsuario.textContent =
                            `@${comentarioAtual.usuario}:`;

                        textoComentario.textContent =
                            comentarioAtual.texto;

                    } else {

                        tituloUsuario.textContent =
                            "@usuario:";

                        textoComentario.textContent =
                            "Nenhum comentário ainda.";
                    }
                }
            );

        } catch (erro) {

            console.error(
                "Erro ao exibir os comentários:",
                erro
            );

            this.caixas.forEach((caixa) => {

                const tituloUsuario =
                    caixa.querySelector("h3");

                const textoComentario =
                    caixa.querySelector("p");

                if (
                    tituloUsuario &&
                    textoComentario
                ) {

                    tituloUsuario.textContent =
                        "@usuario:";

                    textoComentario.textContent =
                        "Não foi possível carregar os comentários.";
                }
            });
        }
    }

};


/* ==========================
INICIAR COMENTÁRIOS
========================== */

window.ComentariosRender.mostrar();