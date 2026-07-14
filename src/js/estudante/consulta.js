const campoProtocolo =
    document.getElementById("protocolo");

const botaoAcompanhar =
    document.getElementById("botaoAcompanhar");

botaoAcompanhar.addEventListener("click", () => {

    const protocolo =
        campoProtocolo.value.trim().toUpperCase();

    if (protocolo === "") {
        alert("Digite o protocolo da denúncia.");
        campoProtocolo.focus();
        return;
    }

    sessionStorage.setItem(
        "protocoloConsulta",
        protocolo
    );

    window.location.href =
        "Acompanhar-estudante.html";
});