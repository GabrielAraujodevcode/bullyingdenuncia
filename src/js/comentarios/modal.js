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


if(
    abrirComentario &&
    fecharComentario &&
    modalComentario &&
    formComentario &&
    nomeUsuario &&
    textoComentario
){

    function encerrarJanelaComentario(){

        modalComentario.classList.remove("ativo");

        formComentario.reset();

        if(quantidadeCaracteres){

            quantidadeCaracteres.textContent = "0";

        }

    }


    abrirComentario.addEventListener("click", () => {

        modalComentario.classList.add("ativo");

        nomeUsuario.focus();

    });


    fecharComentario.addEventListener(
        "click",
        encerrarJanelaComentario
    );


    modalComentario.addEventListener(
        "click",
        (evento) => {

            if(evento.target === modalComentario){

                encerrarJanelaComentario();

            }

        }
    );


    textoComentario.addEventListener("input", () => {

        if(quantidadeCaracteres){

            quantidadeCaracteres.textContent =
                textoComentario.value.length;

        }

    });


    formComentario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();

            const usuarioDigitado =
                nomeUsuario.value.trim();

            const comentarioDigitado =
                textoComentario.value.trim();


            if(
                usuarioDigitado === "" ||
                comentarioDigitado === ""
            ){

                alert(
                    "Preencha o nome de usuário e o comentário."
                );

                return;

            }


            if(comentarioDigitado.length > 60){

                alert(
                    "O comentário deve ter no máximo 60 caracteres."
                );

                return;

            }


            const comentarios =
                window.ComentariosRender
                    .carregarComentarios();


            const novoComentario = {

                usuario: usuarioDigitado,

                comentario: comentarioDigitado

            };


            if(comentarios.length >= 4){

                comentarios.shift();

            }


            comentarios.push(novoComentario);


            window.ComentariosStorage.salvar(
                comentarios
            );


            window.ComentariosRender.mostrar();


            encerrarJanelaComentario();

        }
    );

}