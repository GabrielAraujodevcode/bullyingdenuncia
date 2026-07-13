/* ==========================
MODAL PARA PUBLICAR NOTÍCIAS
========================== */

const abrirNoticia =
    document.getElementById("abrirNoticia");

const fecharNoticia =
    document.getElementById("fecharNoticia");

const modalNoticia =
    document.getElementById("modalNoticia");

const formNoticia =
    document.getElementById("formNoticia");

const textoNoticia =
    document.getElementById("textoNoticia");

const quantidadeNoticia =
    document.getElementById("quantidadeNoticia");


if(
    abrirNoticia &&
    fecharNoticia &&
    modalNoticia &&
    formNoticia &&
    textoNoticia
){

    function encerrarJanelaNoticia(){

        modalNoticia.classList.remove("ativo");

        formNoticia.reset();

        if(quantidadeNoticia){

            quantidadeNoticia.textContent = "0";

        }

    }


    abrirNoticia.addEventListener("click", () => {

        modalNoticia.classList.add("ativo");

        textoNoticia.focus();

    });


    fecharNoticia.addEventListener(
        "click",
        encerrarJanelaNoticia
    );


    modalNoticia.addEventListener(
        "click",
        (evento) => {

            if(evento.target === modalNoticia){

                encerrarJanelaNoticia();

            }

        }
    );


    textoNoticia.addEventListener("input", () => {

        if(quantidadeNoticia){

            quantidadeNoticia.textContent =
                textoNoticia.value.length;

        }

    });


    formNoticia.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();

            const novaNoticia =
                textoNoticia.value.trim();


            if(novaNoticia === ""){

                alert(
                    "Digite uma notícia antes de publicar."
                );

                return;

            }


            if(novaNoticia.length > 120){

                alert(
                    "A notícia deve ter no máximo 120 caracteres."
                );

                return;

            }


            const noticias =
                window.NoticiasRender
                    .carregarNoticias();


            if(noticias.length >= 2){

                noticias.shift();

            }


            noticias.push(novaNoticia);


            window.NoticiasStorage.salvar(
                noticias
            );


            window.NoticiasRender.mostrar();


            encerrarJanelaNoticia();

        }
    );

}