function carregarDenunciaEstudante(){

    const elementos =
        window.DenunciaEstudanteElementos;

    const protocoloAtual =
        localStorage.getItem("protocoloAtual");

    const denuncia =
        window.DenunciasStorage.buscarPorProtocolo(
            protocoloAtual
        );


    if(!denuncia){

        elementos.protocolo.textContent =
            "Protocolo não encontrado";

        elementos.status.textContent =
            "Indisponível";

        elementos.mensagem.textContent =
            "Não foi possível localizar essa denúncia.";

        return;

    }


    elementos.protocolo.textContent =
        denuncia.protocolo;

    elementos.status.textContent =
        denuncia.status;

    elementos.mensagem.textContent =
        denuncia.mensagem ||
        "Ainda não existe uma mensagem da secretaria.";


    window.DenunciaEstudanteStatus.atualizarCor(
        denuncia.status
    );

    window.DenunciaEstudanteStatus.atualizarEtapas(
        denuncia.status
    );

}


window.addEventListener("storage", (evento) => {

    if(
        evento.key ===
        window.DenunciasStorage.chave
    ){

        carregarDenunciaEstudante();

    }

});


carregarDenunciaEstudante();