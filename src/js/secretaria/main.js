/* ==========================
VERIFICAR AUTENTICAÇÃO
========================== */

const token = localStorage.getItem("tokenAdministrador");

if (!token) {
    window.location.replace("login.html");
}


/* ==========================
BOTÃO SAIR
========================== */

const botaoSair = document.getElementById("btnSair");

if (botaoSair) {

    botaoSair.addEventListener("click", () => {

        const confirmar = confirm(
            "Deseja realmente sair?"
        );

        if (!confirmar) {
            return;
        }

        localStorage.removeItem("tokenAdministrador");
        localStorage.removeItem("administrador");

        window.location.replace("login.html");

    });

}


/* ==========================
INICIAR PÁGINA DA SECRETARIA
========================== */

function iniciarPaginaSecretaria() {

    window.DenunciaSecretariaModal.iniciar();

    window.DenunciaSecretariaAtualizar.iniciar();

    window.DenunciaSecretariaTabela.montar();

}


/* ==========================
INICIALIZAÇÃO
========================== */

iniciarPaginaSecretaria();