/* ==========================
MODAL DA DENÚNCIA
========================== */

window.DenunciaSecretariaModal = {

    protocoloSelecionado: null,


    abrir(protocolo){

        const elementos =
            window.DenunciaSecretariaElementos;

        const denuncia =
            window.DenunciasStorage
                .buscarPorProtocolo(protocolo);


        if(!denuncia){

            alert("Denúncia não encontrada.");

            return;

        }


        this.protocoloSelecionado =
            denuncia.protocolo;


        elementos.protocolo.textContent =
            denuncia.protocolo;

        elementos.usuario.textContent =
            denuncia.usuario;

        elementos.local.textContent =
            denuncia.local;

        elementos.autor.textContent =
            denuncia.autor;

        elementos.tipo.textContent =
            denuncia.tipo;

        elementos.relato.textContent =
            denuncia.relato;

        elementos.status.value =
            denuncia.status;

        elementos.mensagem.value =
            denuncia.mensagem || "";

        elementos.contador.textContent =
            elementos.mensagem.value.length;


        elementos.modal.classList.add(
            "ativo"
        );

    },


    fechar(){

        const elementos =
            window.DenunciaSecretariaElementos;


        elementos.modal.classList.remove(
            "ativo"
        );

        this.protocoloSelecionado = null;

    },


    iniciar(){

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

                if(evento.target === elementos.modal){

                    this.fechar();

                }

            }
        );

    }

};