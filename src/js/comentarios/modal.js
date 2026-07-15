/* ==========================
MODAL DE COMENTÁRIOS
========================== */

const abrirComentario =
    document.getElementById("abrirComentario");

const fecharComentario =
    document.getElementById("fecharComentario");

const modalComentario =
    document.getElementById("modalComentario");

const formComentario =
    document.getElementById("formComentario");

const nomeUsuario =
    document.getElementById("nomeUsuario");

const textoComentario =
    document.getElementById("textoComentario");

const quantidadeCaracteres =
    document.getElementById("quantidadeCaracteres");


if (
    abrirComentario &&
    fecharComentario &&
    modalComentario &&
    formComentario &&
    nomeUsuario &&
    textoComentario
) {

    function encerrarJanelaComentario() {

        modalComentario.classList.remove("ativo");

        formComentario.reset();

        if (quantidadeCaracteres) {
            quantidadeCaracteres.textContent = "0";
        }
    }


    abrirComentario.addEventListener(
        "click",
        () => {

            modalComentario.classList.add("ativo");

            nomeUsuario.focus();
        }
    );


    fecharComentario.addEventListener(
        "click",
        encerrarJanelaComentario
    );


    modalComentario.addEventListener(
        "click",
        (evento) => {

            if (evento.target === modalComentario) {
                encerrarJanelaComentario();
            }
        }
    );


    textoComentario.addEventListener(
        "input",
        () => {

            if (quantidadeCaracteres) {
                quantidadeCaracteres.textContent =
                    textoComentario.value.length;
            }
        }
    );


    formComentario.addEventListener(
        "submit",
        async (evento) => {

            evento.preventDefault();

            const usuarioDigitado =
                nomeUsuario.value.trim();

            const comentarioDigitado =
                textoComentario.value.trim();

            if (
                usuarioDigitado === "" ||
                comentarioDigitado === ""
            ) {
                alert(
                    "Preencha o nome de usuário e o comentário."
                );

                return;
            }

            if (usuarioDigitado.length > 30) {
                alert(
                    "O nome de usuário deve ter no máximo 30 caracteres."
                );

                nomeUsuario.focus();

                return;
            }

            if (comentarioDigitado.length > 150) {
                alert(
                    "O comentário deve ter no máximo 150 caracteres."
                );

                textoComentario.focus();

                return;
            }

            const botaoEnviar =
                formComentario.querySelector(
                    'button[type="submit"]'
                );

            try {

                botaoEnviar.disabled = true;
                botaoEnviar.textContent =
                    "Publicando...";

                await window.ComentariosStorage.salvar(
                    usuarioDigitado,
                    comentarioDigitado
                );

                await window.ComentariosRender.mostrar();

                encerrarJanelaComentario();

            } catch (erro) {

                console.error(erro);

                alert(
                    erro.message ||
                    "Não foi possível publicar o comentário."
                );

            } finally {

                botaoEnviar.disabled = false;
                botaoEnviar.textContent =
                    "Comentar";
            }
        }
    );
}