const formLogin =
    document.getElementById("formLogin");

const campoUsuario =
    document.getElementById("usuario");

const campoSenha =
    document.getElementById("senha");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const mensagemLogin =
    document.getElementById("mensagemLogin");

const botaoEntrar =
    document.querySelector(".botaoEntrar");


/* ==========================
DADOS TEMPORÁRIOS DE ACESSO
========================== */

const usuarioCorreto = "secretaria";
const senhaCorreta = "123456";


/* ==========================
MOSTRAR OU ESCONDER SENHA
========================== */

mostrarSenha.addEventListener("click", () => {

    const senhaEstaVisivel =
        campoSenha.type === "text";


    if(senhaEstaVisivel){

        campoSenha.type = "password";

        mostrarSenha.textContent = "👁";

        mostrarSenha.setAttribute(
            "aria-label",
            "Mostrar senha"
        );

    }else{

        campoSenha.type = "text";

        mostrarSenha.textContent = "🙈";

        mostrarSenha.setAttribute(
            "aria-label",
            "Esconder senha"
        );

    }

});


/* ==========================
EXIBIR MENSAGEM
========================== */

function exibirMensagem(texto, tipo){

    mensagemLogin.textContent = texto;

    mensagemLogin.classList.remove(
        "mensagemErro",
        "mensagemSucesso"
    );


    if(tipo === "erro"){

        mensagemLogin.classList.add(
            "mensagemErro"
        );

    }


    if(tipo === "sucesso"){

        mensagemLogin.classList.add(
            "mensagemSucesso"
        );

    }

}


/* ==========================
REALIZAR LOGIN
========================== */

formLogin.addEventListener("submit", (evento) => {

    evento.preventDefault();


    const usuarioDigitado =
        campoUsuario.value.trim();

    const senhaDigitada =
        campoSenha.value.trim();


    if(
        usuarioDigitado === "" ||
        senhaDigitada === ""
    ){

        exibirMensagem(
            "Preencha o usuário e a senha.",
            "erro"
        );

        return;

    }


    if(
        usuarioDigitado !== usuarioCorreto ||
        senhaDigitada !== senhaCorreta
    ){

        exibirMensagem(
            "Usuário ou senha incorretos.",
            "erro"
        );

        campoSenha.value = "";

        campoSenha.focus();

        return;

    }


    exibirMensagem(
        "Login realizado com sucesso!",
        "sucesso"
    );


    botaoEntrar.disabled = true;

    botaoEntrar.textContent =
        "Entrando...";


    localStorage.setItem(
        "secretariaLogada",
        "true"
    );


    setTimeout(() => {

        window.location.href =
            "secretaria.html";

    }, 1000);

});