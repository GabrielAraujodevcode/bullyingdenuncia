const API_URL = "https://bullyingdenuncia-api.onrender.com/api";

const formularioLogin =
    document.getElementById("formLogin");

const campoEmail =
    document.getElementById("email");

const campoSenha =
    document.getElementById("senha");

const botaoEntrar =
    formularioLogin.querySelector(
        'button[type="submit"]'
    );

const mensagemLogin =
    document.getElementById("mensagemLogin");

const botaoMostrarSenha =
    document.getElementById("mostrarSenha");


async function realizarLogin(email, senha) {

    const resposta = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            resultado.erro ||
            "Não foi possível realizar o login."
        );
    }

    return resultado;
}


formularioLogin.addEventListener(
    "submit",
    async (evento) => {

        evento.preventDefault();

        const email =
            campoEmail.value.trim();

        const senha =
            campoSenha.value;

        mensagemLogin.textContent = "";

        if (!email || !senha) {

            mensagemLogin.textContent =
                "Preencha o e-mail e a senha.";

            return;
        }

        try {

            botaoEntrar.disabled = true;

            botaoEntrar.textContent =
                "Entrando...";

            const resultado =
                await realizarLogin(
                    email,
                    senha
                );

            localStorage.setItem(
                "tokenAdministrador",
                resultado.token
            );

            localStorage.setItem(
                "administrador",
                JSON.stringify(
                    resultado.administrador
                )
            );

            window.location.href =
    "secretaria.html";

        } catch (erro) {

            mensagemLogin.textContent =
                erro.message;

        } finally {

            botaoEntrar.disabled = false;

            botaoEntrar.textContent =
                "Entrar";
        }
    }
);


botaoMostrarSenha.addEventListener(
    "click",
    () => {

        const senhaVisivel =
            campoSenha.type === "text";

        campoSenha.type =
            senhaVisivel
                ? "password"
                : "text";

        botaoMostrarSenha.textContent =
            senhaVisivel
                ? "👁"
                : "X";

        botaoMostrarSenha.setAttribute(
            "aria-label",
            senhaVisivel
                ? "Mostrar senha"
                : "Ocultar senha"
        );
    }
);