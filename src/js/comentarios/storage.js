/* ==========================
ARMAZENAMENTO DOS COMENTÁRIOS
========================== */

window.ComentariosStorage = {

    chave: "comentariosEstudantes",


    carregar(){

        const comentariosSalvos = localStorage.getItem(
            this.chave
        );

        if(!comentariosSalvos){

            return null;

        }

        try{

            return JSON.parse(comentariosSalvos);

        }catch(erro){

            console.error(
                "Não foi possível carregar os comentários.",
                erro
            );

            return [];

        }

    },


    salvar(comentarios){

        localStorage.setItem(
            this.chave,
            JSON.stringify(comentarios)
        );

    }

};