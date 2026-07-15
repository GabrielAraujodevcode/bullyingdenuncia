/* ==========================
EXIBIÇÃO DAS NOTÍCIAS
========================== */

window.NoticiasRender = {

    caixas: document.querySelectorAll(
        ".noticia1, .noticia2"
    ),

    noticias: [],


    async carregarNoticias() {

        const noticias =
            await window.NoticiasStorage.carregar();

        this.noticias =
            noticias.slice(0, 2);

        return this.noticias;
    },


    async mostrar() {

        try {

            const noticias =
                await this.carregarNoticias();

            this.caixas.forEach(
                (caixa, indice) => {

                    const paragrafo =
                        caixa.querySelector("p");

                    if (!paragrafo) {
                        return;
                    }

                    const noticiaAtual =
                        noticias[indice];

                    if (noticiaAtual) {

                        paragrafo.textContent =
                            noticiaAtual.texto;

                    } else {

                        paragrafo.textContent =
                            "Nenhuma notícia publicada.";
                    }
                }
            );

        } catch (erro) {

            console.error(
                "Erro ao exibir as notícias:",
                erro
            );

            this.caixas.forEach((caixa) => {

                const paragrafo =
                    caixa.querySelector("p");

                if (paragrafo) {

                    paragrafo.textContent =
                        "Não foi possível carregar as notícias.";
                }
            });
        }
    }

};


/* ==========================
INICIAR NOTÍCIAS
========================== */

window.NoticiasRender.mostrar();