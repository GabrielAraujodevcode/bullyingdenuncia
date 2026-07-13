window.DenunciaEstudanteStatus = {

    atualizarCor(status){

        const elementos =
            window.DenunciaEstudanteElementos;

        elementos.status.classList.remove(
            "statusAnalise",
            "statusAndamento",
            "statusConcluida"
        );


        if(status === "Em análise"){

            elementos.status.classList.add(
                "statusAnalise"
            );

        }


        if(status === "Em andamento"){

            elementos.status.classList.add(
                "statusAndamento"
            );

        }


        if(status === "Concluída"){

            elementos.status.classList.add(
                "statusConcluida"
            );

        }

    },


    atualizarEtapas(status){

        const elementos =
            window.DenunciaEstudanteElementos;


        elementos.etapas.forEach((etapa) => {

            etapa.classList.remove("ativa");

        });


        elementos.linhaEtapa1.classList.remove(
            "ativa"
        );

        elementos.linhaEtapa2.classList.remove(
            "ativa"
        );


        if(status === "Em análise"){

            elementos.etapas[0].classList.add(
                "ativa"
            );

        }


        if(status === "Em andamento"){

            elementos.etapas[0].classList.add(
                "ativa"
            );

            elementos.etapas[1].classList.add(
                "ativa"
            );

            elementos.linhaEtapa1.classList.add(
                "ativa"
            );

        }


        if(status === "Concluída"){

            elementos.etapas.forEach((etapa) => {

                etapa.classList.add("ativa");

            });

            elementos.linhaEtapa1.classList.add(
                "ativa"
            );

            elementos.linhaEtapa2.classList.add(
                "ativa"
            );

        }

    }

};