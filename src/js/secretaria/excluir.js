/* 
EXCLUIR DENÚNCIA
 */

window.DenunciaSecretariaExcluir = {

    async excluir() {

        const elementos =
            window.DenunciaSecretariaElementos;

        const modal =
            window.DenunciaSecretariaModal;

        const id =
            modal.idSelecionado;

        const protocolo =
            modal.protocoloSelecionado;

        if (!id) {

            alert(
                "Nenhuma denúncia foi selecionada."
            );

            return;
        }

        const confirmou =
            confirm(
                `Deseja realmente excluir a denúncia ${protocolo}?\n\nEssa ação não poderá ser desfeita.`
            );

        if (!confirmou) {
            return;
        }

        const textoOriginal =
            elementos.botaoExcluir.innerHTML;

        try {

            elementos.botaoExcluir.disabled =
                true;

            elementos.botaoExcluir.textContent =
                "Excluindo...";

            await window.Api.excluirDenuncia(
                id
            );

            modal.fechar();

            await window
                .DenunciaSecretariaTabela
                .montar();

            alert(
                "Denúncia excluída com sucesso!"
            );

        } catch (erro) {

            console.error(erro);

            alert(
                erro.message ||
                "Não foi possível excluir a denúncia."
            );

        } finally {

            elementos.botaoExcluir.disabled =
                false;

            elementos.botaoExcluir.innerHTML =
                textoOriginal;
        }
    },


    iniciar() {

        const elementos =
            window.DenunciaSecretariaElementos;

        if (!elementos.botaoExcluir) {
            return;
        }

        elementos.botaoExcluir.addEventListener(
            "click",
            () => {
                this.excluir();
            }
        );
    }

};