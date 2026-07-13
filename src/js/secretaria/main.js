/* ==========================
INICIAR PÁGINA DA SECRETARIA
========================== */

function iniciarPaginaSecretaria(){

    window.DenunciaSecretariaModal.iniciar();

    window.DenunciaSecretariaAtualizar.iniciar();

    window.DenunciaSecretariaTabela.montar();

}


/* ==========================
ATUALIZAÇÃO ENTRE ABAS
========================== */

window.addEventListener(
    "storage",
    (evento) => {

        if(
            evento.key ===
            window.DenunciasStorage.chave
        ){

            window.DenunciaSecretariaTabela
                .montar();

        }

    }
);


/* ==========================
INICIALIZAÇÃO
========================== */

iniciarPaginaSecretaria();