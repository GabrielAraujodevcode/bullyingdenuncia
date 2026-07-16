const botaoSair =
    document.getElementById("btnSair");

if (botaoSair) {

    botaoSair.addEventListener(
        "click",
        () => {

            const confirmou =
                confirm(
                    "Deseja realmente sair?"
                );

            if (!confirmou) {
                return;
            }

            window.Auth.sair();
        }
    );
}