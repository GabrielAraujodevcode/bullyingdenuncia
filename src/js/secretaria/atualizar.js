/* ==========================
ATUALIZAR DENÚNCIA
========================== */

window.DenunciaSecretariaAtualizar = {

    atualizarContador(){

        const elementos =
            window.DenunciaSecretariaElementos;

        elementos.contador.textContent =
            elementos.mensagem.value.length;

    },


    salvarAtualizacao(evento){

        evento.preventDefault();


        const elementos =
            window.DenunciaSecretariaElementos;

        const protocolo =
            window.DenunciaSecretariaModal
                .protocoloSelecionado;


        if(!protocolo){

            alert(
                "Nenhuma denúncia foi selecionada."
            );

            return;

        }


        const mensagem =
            elementos.mensagem.value.trim();

        const status =
            elementos.status.value;


        if(mensagem === ""){

            alert(
                "Digite uma mensagem para o aluno."
            );

            elementos.mensagem.focus();

            return;

        }


        if(mensagem.length > 300){

            alert(
                "A mensagem deve ter no máximo 300 caracteres."
            );

            return;

        }


        const atualizou =
            window.DenunciasStorage.atualizar(
                protocolo,
                {
                    status,
                    mensagem
                }
            );


        if(!atualizou){

            alert(
                "Não foi possível atualizar a denúncia."
            );

            return;

        }


        window.DenunciaSecretariaTabela.montar();

        window.DenunciaSecretariaModal.fechar();


        alert(
            "Denúncia atualizada com sucesso!"
        );

    },


    iniciar(){

        const elementos =
            window.DenunciaSecretariaElementos;


        elementos.mensagem.addEventListener(
            "input",
            () => {

                this.atualizarContador();

            }
        );


        elementos.formulario.addEventListener(
            "submit",
            (evento) => {

                this.salvarAtualizacao(evento);

            }
        );

    }

};