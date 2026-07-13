/* ==========================
EXIBIÇÃO DOS COMENTÁRIOS
========================== */

window.ComentariosRender = {

    caixas: document.querySelectorAll(
        ".comentario1, .comentario2, .comentario3, .comentario4"
    ),


    obterComentariosIniciais(){

        const comentariosIniciais = [];

        this.caixas.forEach((caixa) => {

            const tituloUsuario = caixa.querySelector("h3");
            const textoComentario = caixa.querySelector("p");

            if(!tituloUsuario || !textoComentario){

                return;

            }

            const usuario = tituloUsuario.textContent
                .replace("@", "")
                .replace(":", "")
                .trim();

            const comentario = textoComentario.textContent.trim();

            comentariosIniciais.push({

                usuario,
                comentario

            });

        });

        return comentariosIniciais;

    },


    carregarComentarios(){

        let comentarios =
            window.ComentariosStorage.carregar();


        if(comentarios === null){

            comentarios = this.obterComentariosIniciais();

            window.ComentariosStorage.salvar(
                comentarios
            );

        }

        return comentarios;

    },


    mostrar(){

        const comentarios =
            this.carregarComentarios();


        this.caixas.forEach((caixa, indice) => {

            const tituloUsuario = caixa.querySelector("h3");

            const textoComentario = caixa.querySelector("p");

            if(!tituloUsuario || !textoComentario){

                return;

            }

            const comentarioAtual = comentarios[indice];


            if(comentarioAtual){

                tituloUsuario.textContent =
                    `@${comentarioAtual.usuario}:`;

                textoComentario.textContent =
                    comentarioAtual.comentario;

            }else{

                tituloUsuario.textContent =
                    "@usuario:";

                textoComentario.textContent =
                    "Nenhum comentário ainda.";

            }

        });

    }

};


/* ==========================
INICIAR COMENTÁRIOS
========================== */

window.ComentariosRender.mostrar();


/* ==========================
ATUALIZAR ENTRE ABAS
========================== */

window.addEventListener("storage", (evento) => {

    if(
        evento.key ===
        window.ComentariosStorage.chave
    ){

        window.ComentariosRender.mostrar();

    }

});