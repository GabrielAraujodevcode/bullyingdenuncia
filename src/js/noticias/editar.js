/* ==========================
EDITAR E APAGAR NOTÍCIAS
========================== */

const editarNoticias =
    document.getElementById("editarNoticias");

const modalEditarNoticias =
    document.getElementById("modalEditarNoticias");

const fecharEditarNoticias =
    document.getElementById("fecharEditarNoticias");

const listaEditarNoticias =
    document.getElementById("listaEditarNoticias");


if (
    editarNoticias &&
    modalEditarNoticias &&
    fecharEditarNoticias &&
    listaEditarNoticias
) {

    async function montarListaNoticias() {

        listaEditarNoticias.innerHTML = `
            <p class="semNoticias">
                Carregando notícias...
            </p>
        `;

        try {

            const noticias =
                await window.NoticiasStorage
                    .carregar();

            listaEditarNoticias.innerHTML = "";

            if (noticias.length === 0) {

                listaEditarNoticias.innerHTML = `
                    <p class="semNoticias">
                        Nenhuma notícia publicada.
                    </p>
                `;

                return;
            }

            noticias.forEach((noticia) => {

                const item =
                    document.createElement("div");

                item.classList.add(
                    "itemEditarNoticia"
                );


                const texto =
                    document.createElement("p");

                texto.classList.add(
                    "textoEditarNoticia"
                );

                texto.textContent =
                    noticia.texto;


                const botaoApagar =
                    document.createElement("button");

                botaoApagar.type = "button";

                botaoApagar.classList.add(
                    "botaoApagarNoticia"
                );

                botaoApagar.textContent =
                    "Apagar";


                botaoApagar.addEventListener(
                    "click",
                    async () => {

                        await apagarNoticia(
                            noticia.id,
                            botaoApagar
                        );
                    }
                );


                item.append(
                    texto,
                    botaoApagar
                );


                listaEditarNoticias.appendChild(
                    item
                );
            });

        } catch (erro) {

            console.error(erro);

            listaEditarNoticias.innerHTML = `
                <p class="semNoticias">
                    Não foi possível carregar as notícias.
                </p>
            `;
        }
    }


    async function apagarNoticia(
        id,
        botaoApagar
    ) {

        const confirmou =
            confirm(
                "Deseja realmente apagar esta notícia?"
            );

        if (!confirmou) {
            return;
        }

        try {

            botaoApagar.disabled = true;

            botaoApagar.textContent =
                "Apagando...";

            await window.NoticiasStorage
                .apagar(id);

            await window.NoticiasRender
                .mostrar();

            await montarListaNoticias();

        } catch (erro) {

            console.error(erro);

            alert(
                erro.message ||
                "Não foi possível apagar a notícia."
            );

            botaoApagar.disabled = false;

            botaoApagar.textContent =
                "Apagar";
        }
    }


    async function abrirJanelaEditarNoticias() {

        modalEditarNoticias.classList.add(
            "ativo"
        );

        await montarListaNoticias();
    }


    function fecharJanelaEditarNoticias() {

        modalEditarNoticias.classList.remove(
            "ativo"
        );
    }


    editarNoticias.addEventListener(
        "click",
        abrirJanelaEditarNoticias
    );


    fecharEditarNoticias.addEventListener(
        "click",
        fecharJanelaEditarNoticias
    );


    modalEditarNoticias.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target ===
                modalEditarNoticias
            ) {

                fecharJanelaEditarNoticias();
            }
        }
    );
}