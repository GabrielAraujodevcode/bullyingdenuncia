import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./login.css";

import { api } from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);

   async function realizarLogin(evento) {
    evento.preventDefault();

    setMensagem("");

    const emailLimpo = email.trim();

    if (!emailLimpo || !senha) {
        setMensagem("Preencha o e-mail e a senha.");
        return;
    }

    try {
        setEnviando(true);

        const resultado = await api.login(
            emailLimpo,
            senha
        );

        if (!resultado.token) {
            throw new Error(
                "O token de acesso não foi retornado."
            );
        }

        localStorage.setItem(
            "tokenAdministrador",
            resultado.token
        );

        localStorage.setItem(
            "administrador",
            JSON.stringify(
                resultado.administrador ?? {}
            )
        );

        navigate("/secretaria");
    } catch (erro) {
        console.error("Erro ao realizar login:", erro);

        setMensagem(
            erro.message ||
            "Não foi possível realizar o login."
        );
    } finally {
        setEnviando(false);
    }
}

    return (
        <>
            <header>
                <Link
                    to="/"
                    className="voltarInicio"
                    aria-label="Voltar para a página inicial"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path
                            fill="currentColor"
                            d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352H544C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288H173.3L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.4Z"
                        />
                    </svg>

                    <span>Voltar ao início</span>
                </Link>

                <div className="title">
                    <h1>Área da Secretaria</h1>
                </div>
            </header>

            <main>
                <section className="areaLogin">
                    <div className="containerLogin">
                        <div className="iconeLogin">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M192 272L192 208C192 137.3 249.3 80 320 80C390.7 80 448 137.3 448 208L448 272L480 272C497.7 272 512 286.3 512 304L512 528C512 545.7 497.7 560 480 560L160 560C142.3 560 128 545.7 128 528L128 304C128 286.3 142.3 272 160 272L192 272ZM256 272L384 272L384 208C384 172.7 355.3 144 320 144C284.7 144 256 172.7 256 208L256 272Z"
                                />
                            </svg>
                        </div>

                        <h2>Entrar no sistema</h2>

                        <p className="descricaoLogin">
                            Digite seus dados para acessar a área da secretaria.
                        </p>

                        <form id="formLogin" onSubmit={realizarLogin}>
                            <div className="campoLogin">
                                <label htmlFor="email">
                                    E-mail
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Digite seu e-mail"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(evento) =>
                                        setEmail(evento.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="campoLogin">
                                <label htmlFor="senha">
                                    Senha
                                </label>

                                <div className="campoSenha">
                                    <input
                                        type={senhaVisivel ? "text" : "password"}
                                        id="senha"
                                        name="senha"
                                        placeholder="Digite sua senha"
                                        autoComplete="current-password"
                                        value={senha}
                                        onChange={(evento) =>
                                            setSenha(evento.target.value)
                                        }
                                        required
                                    />

                                    <button
                                        type="button"
                                        id="mostrarSenha"
                                        className="mostrarSenha"
                                        aria-label={
                                            senhaVisivel
                                                ? "Ocultar senha"
                                                : "Mostrar senha"
                                        }
                                        onClick={() =>
                                            setSenhaVisivel((valor) => !valor)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M320 160C441.8 160 542.1 240.3 576 352C542.1 463.7 441.8 544 320 544C198.2 544 97.9 463.7 64 352C97.9 240.3 198.2 160 320 160ZM320 448C373 448 416 405 416 352C416 299 373 256 320 256C267 256 224 299 224 352C224 405 267 448 320 448Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <p
                                className={`mensagemLogin ${
                                    mensagem ? "mensagemErro" : ""
                                }`}
                                id="mensagemLogin"
                            >
                                {mensagem}
                            </p>

                            <button
                                type="submit"
                                className="botaoEntrar"
                                disabled={enviando}
                            >
                                {enviando ? "Entrando..." : "Entrar"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer>
                <div className="copyright">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path
                            fill="currentColor"
                            d="M320 64L96 176V320C96 459.5 191.5 532.7 320 576C448.5 532.7 544 459.5 544 320V176L320 64Z"
                        />
                    </svg>

                    <p>
                        © 2026 Portal de Denúncias • Desenvolvido por
                        <strong> Gabriel Araújo</strong>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Login;