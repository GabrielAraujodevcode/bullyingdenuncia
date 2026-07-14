/* ==========================
MODAL DA DENÚNCIA
========================== */

window.DenunciaSecretariaModal = {

    protocoloSelecionado: null,

    async abrir(protocolo) {

        const elementos =
            window.DenunciaSecretariaElementos;

        try {

            elementos.modal.classList.add(
                "ativo"
            );

            elementos.protocolo.textContent =
                protocolo;

            elementos.usuario.textContent =
                "Carregando...";

            elementos.local.textContent =
                "Carregando...";

            elementos.autor.textContent =
                "Carregando...";

            elementos.tipo.textContent =
                "Carregando...";

            elementos.relato.textContent =
                "Carregando...";

            const denuncia =
                await window.Api.buscarDenuncia(
                    protocolo
                );

            this.protocoloSelecionado =
                denuncia.protocolo;

            elementos.protocolo.textContent =
                denuncia.protocolo;

            elementos.usuario.textContent =
                denuncia.usuario_anonimo;

            elementos.local.textContent =
                denuncia.local_ocorrencia;

            elementos.autor.textContent =
                denuncia.agressor_descricao;

            elementos.tipo.textContent =
                denuncia.tipo_bullying;

            elementos.relato.textContent =
                denuncia.relato;

            elementos.status.value =
                window.DenunciaSecretariaTabela
                    .formatarStatus(
                        denuncia.status
                    );

            elementos.mensagem.value =
                denuncia.mensagem_secretaria || "";

            elementos.contador.textContent =
                elementos.mensagem.value.length;

        } catch (erro) {

            console.error(erro);

            this.fechar();

            alert(
                erro.message ||
                "Não foi possível carregar a denúncia."
            );
        }
    },

    fechar() {

        const elementos =
            window.DenunciaSecretariaElementos;

        elementos.modal.classList.remove(
            "ativo"
        );

        elementos.formulario.reset();

        elementos.contador.textContent = "0";

        this.protocoloSelecionado = null;
    },

    iniciar() {

        const elementos =
            window.DenunciaSecretariaElementos;

        elementos.fecharModal.addEventListener(
            "click",
            () => {
                this.fechar();
            }
        );

        elementos.modal.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target ===
                    elementos.modal
                ) {
                    this.fechar();
                }
            }
        );
    }
};