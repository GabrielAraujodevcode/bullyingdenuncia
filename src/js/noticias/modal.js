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


if (
    abrirNoticia &&
    fecharNoticia &&
    modalNoticia &&
    formNoticia &&
    textoNoticia
) {

    function encerrarJanelaNoticia() {

        modalNoticia.classList.remove("ativo");

        formNoticia.reset();

        if (quantidadeNoticia) {
            quantidadeNoticia.textContent = "0";
        }
    }


    abrirNoticia.addEventListener(
        "click",
        () => {

            modalNoticia.classList.add("ativo");

            textoNoticia.focus();
        }
    );


    fecharNoticia.addEventListener(
        "click",
        encerrarJanelaNoticia
    );


    modalNoticia.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modalNoticia) {
                encerrarJanelaNoticia();
            }
        }
    );


    textoNoticia.addEventListener(
        "input",
        () => {

            if (quantidadeNoticia) {
                quantidadeNoticia.textContent =
                    textoNoticia.value.length;
            }
        }
    );


    formNoticia.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();

            const novaNoticia =
                textoNoticia.value.trim();

            if (novaNoticia === "") {

                alert(
                    "Digite uma notícia antes de publicar."
                );

                textoNoticia.focus();

                return;
            }

            if (novaNoticia.length > 200) {

                alert(
                    "A notícia deve ter no máximo 200 caracteres."
                );

                textoNoticia.focus();

                return;
            }

            const botaoPublicar =
                formNoticia.querySelector(
                    'button[type="submit"]'
                );

            try {

                botaoPublicar.disabled = true;

                botaoPublicar.textContent =
                    "Publicando...";

                await window.NoticiasStorage.salvar(
                    novaNoticia
                );

                await window.NoticiasRender.mostrar();

                encerrarJanelaNoticia();

            } catch (erro) {

                console.error(erro);

                alert(
                    erro.message ||
                    "Não foi possível publicar a notícia."
                );

            } finally {

                botaoPublicar.disabled = false;

                botaoPublicar.textContent =
                    "Publicar";
            }
        }
    );
}