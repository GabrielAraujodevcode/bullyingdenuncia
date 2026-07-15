window.ComentariosStorage = {

    async carregar(){

        return await window.Api.listarComentarios();

    },


    async salvar(usuario, comentario){

        return await window.Api.criarComentario({

            usuario,

            texto: comentario

        });

    },


    async apagar(id){

        return await window.Api.excluirComentario(id);

    }

};