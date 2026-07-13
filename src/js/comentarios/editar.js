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


if(
    botaoEditar &&
    modalEditar &&
    fecharEditar &&
    listaEditarComentarios
){

    function montarListaEdicao(){

        const comentarios =
            window.ComentariosRender
                .carregarComentarios();

        listaEditarComentarios.innerHTML = "";


        if(comentarios.length === 0){

            listaEditarComentarios.innerHTML = `
                <p class="semComentarios">
                    Nenhum comentário publicado.
                </p>
            `;

            return;

        }


        comentarios.forEach((comentario, indice) => {

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
                comentario.comentario;


            const botaoApagar =
                document.createElement("button");

            botaoApagar.type = "button";

            botaoApagar.classList.add(
                "botaoApagarComentario"
            );

            botaoApagar.textContent = "Apagar";


            botaoApagar.addEventListener(
                "click",
                () => {

                    apagarComentario(indice);

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

    }


    function apagarComentario(indice){

        const comentarios =
            window.ComentariosRender
                .carregarComentarios();

        comentarios.splice(indice, 1);


        window.ComentariosStorage.salvar(
            comentarios
        );


        window.ComentariosRender.mostrar();


        montarListaEdicao();

    }


    function abrirJanelaEditar(){

        montarListaEdicao();

        modalEditar.classList.add("ativo");

    }


    function fecharJanelaEditar(){

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

            if(evento.target === modalEditar){

                fecharJanelaEditar();

            }

        }
    );

}