/* ==========================
ARMAZENAMENTO DAS NOTÍCIAS
========================== */

window.NoticiasStorage = {

    chave: "noticiasSecretaria",


    carregar(){

        const noticiasSalvas = localStorage.getItem(
            this.chave
        );

        if(!noticiasSalvas){

            return null;

        }

        try{

            return JSON.parse(noticiasSalvas);

        }catch(erro){

            console.error(
                "Não foi possível carregar as notícias.",
                erro
            );

            return [];

        }

    },


    salvar(noticias){

        localStorage.setItem(
            this.chave,
            JSON.stringify(noticias)
        );

    }

};