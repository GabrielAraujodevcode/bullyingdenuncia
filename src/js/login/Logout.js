const botaoSair =
    document.getElementById("botaoSair");

if (botaoSair) {

    botaoSair.addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Deseja realmente sair?"
                )
            ) {

                window.Auth.sair();

            }

        }
    );

}