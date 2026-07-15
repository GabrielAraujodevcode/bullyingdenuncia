/* ==========================
EDITAR E APAGAR COMENTÁRIOS
========================== */

const botaoEditar =
    document.getElementById("botaoEditar");

const modalEditar =
    document.getElementById("modalEditar");

const fecharEditar =
    document.getElementById("fecharEditar");

const listaEditarComentarios =
    document.getElementById("listaEditarComentarios");


if (
    botaoEditar &&
    modalEditar &&
    fecharEditar &&
    listaEditarComentarios
) {

    async function montarListaEdicao() {

        listaEditarComentarios.innerHTML = `
            <p class="semComentarios">
                Carregando comentários...
            </p>
        `;

        try {

            const comentarios =
                await window.ComentariosStorage
                    .carregar();

            listaEditarComentarios.innerHTML = "";

            if (comentarios.length === 0) {

                listaEditarComentarios.innerHTML = `
                    <p class="semComentarios">
                        Nenhum comentário publicado.
                    </p>
                `;

                return;
            }

            comentarios.forEach((comentario) => {

                const itemComentario =
                    document.createElement("div");

                itemComentario.classList.add(
                    "itemEditarComentario"
                );


                const conteudoComentario =
                    document.createElement("div");

                conteudoComentario.classList.add(
                    "conteudoEditarComentario"
                );


                const tituloUsuario =
                    document.createElement("h3");

                tituloUsuario.textContent =
                    `@${comentario.usuario}:`;


                const textoDoComentario =
                    document.createElement("p");

                textoDoComentario.textContent =
                    comentario.texto;


                const botaoApagar =
                    document.createElement("button");

                botaoApagar.type = "button";

                botaoApagar.classList.add(
                    "botaoApagarComentario"
                );

                botaoApagar.textContent =
                    "Apagar";


                botaoApagar.addEventListener(
                    "click",
                    async () => {

                        await apagarComentario(
                            comentario.id,
                            botaoApagar
                        );
                    }
                );


                conteudoComentario.append(
                    tituloUsuario,
                    textoDoComentario
                );


                itemComentario.append(
                    conteudoComentario,
                    botaoApagar
                );


                listaEditarComentarios.appendChild(
                    itemComentario
                );
            });

        } catch (erro) {

            console.error(erro);

            listaEditarComentarios.innerHTML = `
                <p class="semComentarios">
                    Não foi possível carregar os comentários.
                </p>
            `;
        }
    }


    async function apagarComentario(
        id,
        botaoApagar
    ) {

        const confirmou =
            confirm(
                "Deseja realmente apagar este comentário?"
            );

        if (!confirmou) {
            return;
        }

        try {

            botaoApagar.disabled = true;
            botaoApagar.textContent =
                "Apagando...";

            await window.ComentariosStorage
                .apagar(id);

            await window.ComentariosRender
                .mostrar();

            await montarListaEdicao();

        } catch (erro) {

            console.error(erro);

            alert(
                erro.message ||
                "Não foi possível apagar o comentário."
            );

            botaoApagar.disabled = false;
            botaoApagar.textContent =
                "Apagar";
        }
    }


    async function abrirJanelaEditar() {

        modalEditar.classList.add("ativo");

        await montarListaEdicao();
    }


    function fecharJanelaEditar() {

        modalEditar.classList.remove("ativo");
    }


    botaoEditar.addEventListener(
        "click",
        abrirJanelaEditar
    );


    fecharEditar.addEventListener(
        "click",
        fecharJanelaEditar
    );


    modalEditar.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modalEditar) {
                fecharJanelaEditar();
            }
        }
    );
}