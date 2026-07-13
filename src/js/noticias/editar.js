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


if(
    editarNoticias &&
    modalEditarNoticias &&
    fecharEditarNoticias &&
    listaEditarNoticias
){

    function montarListaNoticias(){

        const noticias =
            window.NoticiasRender
                .carregarNoticias();

        listaEditarNoticias.innerHTML = "";


        if(noticias.length === 0){

            listaEditarNoticias.innerHTML = `
                <p class="semNoticias">
                    Nenhuma notícia publicada.
                </p>
            `;

            return;

        }


        noticias.forEach((noticia, indice) => {

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

            texto.textContent = noticia;


            const botaoApagar =
                document.createElement("button");

            botaoApagar.type = "button";

            botaoApagar.classList.add(
                "botaoApagarNoticia"
            );

            botaoApagar.textContent = "Apagar";


            botaoApagar.addEventListener(
                "click",
                () => {

                    apagarNoticia(indice);

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

    }


    function apagarNoticia(indice){

        const noticias =
            window.NoticiasRender
                .carregarNoticias();

        noticias.splice(indice, 1);


        window.NoticiasStorage.salvar(
            noticias
        );


        window.NoticiasRender.mostrar();


        montarListaNoticias();

    }


    function abrirJanelaEditarNoticias(){

        montarListaNoticias();

        modalEditarNoticias.classList.add(
            "ativo"
        );

    }


    function fecharJanelaEditarNoticias(){

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

            if(evento.target === modalEditarNoticias){

                fecharJanelaEditarNoticias();

            }

        }
    );

}