/* ==========================
TABELA DE DENÚNCIAS
========================== */

window.DenunciaSecretariaTabela = {

    obterClasseStatus(status){

        if(status === "Em andamento"){

            return "statusAndamento";

        }

        if(status === "Concluída"){

            return "statusConcluida";

        }

        return "statusAnalise";

    },


    montar(){

        const elementos =
            window.DenunciaSecretariaElementos;

        const denuncias =
            window.DenunciasStorage.carregar();


        elementos.lista.innerHTML = "";


        if(denuncias.length === 0){

            const linha =
                document.createElement("tr");

            const coluna =
                document.createElement("td");


            coluna.colSpan = 3;

            coluna.textContent =
                "Nenhuma denúncia registrada.";

            coluna.style.textAlign = "center";


            linha.appendChild(coluna);

            elementos.lista.appendChild(linha);

            return;

        }


        denuncias.forEach((denuncia) => {

            const linha =
                document.createElement("tr");


            /* COLUNA DO PROTOCOLO */

            const colunaProtocolo =
                document.createElement("td");

            colunaProtocolo.textContent =
                denuncia.protocolo;


            /* COLUNA DO STATUS */

            const colunaStatus =
                document.createElement("td");

            const status =
                document.createElement("span");

            status.classList.add(
                "statusTabela",
                this.obterClasseStatus(
                    denuncia.status
                )
            );

            status.textContent =
                denuncia.status;

            colunaStatus.appendChild(status);


            /* COLUNA DO BOTÃO */

            const colunaAcao =
                document.createElement("td");

            const botaoAveriguar =
                document.createElement("button");

            botaoAveriguar.type = "button";

            botaoAveriguar.classList.add(
                "botaoAveriguar"
            );

            botaoAveriguar.textContent =
                "Averiguar";


            botaoAveriguar.addEventListener(
                "click",
                () => {

                    window.DenunciaSecretariaModal
                        .abrir(denuncia.protocolo);

                }
            );


            colunaAcao.appendChild(
                botaoAveriguar
            );


            linha.append(
                colunaProtocolo,
                colunaStatus,
                colunaAcao
            );


            elementos.lista.appendChild(
                linha
            );

        });

    }

};