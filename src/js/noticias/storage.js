/* ==========================
ARMAZENAMENTO DAS NOTÍCIAS
========================== */

window.NoticiasStorage = {

    async carregar(){

        return await window.Api.listarNoticias();

    },


    async salvar(texto){

        return await window.Api.criarNoticia(
            texto
        );

    },


    async apagar(id){

        return await window.Api.excluirNoticia(
            id
        );

    }

};