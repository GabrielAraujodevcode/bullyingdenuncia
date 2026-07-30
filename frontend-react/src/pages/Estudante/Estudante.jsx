import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { api } from "../../services/api";
import "./estudante.css";

const iconeUsuario =
    "M320 320C390.7 320 448 262.7 448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320ZM144 576H496C513.7 576 528 561.7 528 544C528 438 442 352 336 352H304C198 352 112 438 112 544C112 561.7 126.3 576 144 576Z";

function Estudante() {
    const navigate = useNavigate();

    const [comentarios, setComentarios] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [textoComentario, setTextoComentario] = useState("");
    const [protocolo, setProtocolo] = useState("");
    const [publicando, setPublicando] = useState(false);
    const [erroComentarios, setErroComentarios] = useState(false);
    const [erroNoticias, setErroNoticias] = useState(false);

    useEffect(() => {
        carregarConteudo();
    }, []);

    async function carregarConteudo() {
        await Promise.all([
            carregarComentarios(),
            carregarNoticias()
        ]);
    }

    async function carregarComentarios() {
        try {
            setErroComentarios(false);

            const resultado = await api.listarComentarios();

            setComentarios((resultado.comentarios ?? []).slice(0, 4));
        } catch (erro) {
            console.error(erro);
            setErroComentarios(true);
        }
    }

    async function carregarNoticias() {
        try {
            setErroNoticias(false);

            const resultado = await api.listarNoticias();

            setNoticias((resultado.noticias ?? []).slice(0, 2));
        } catch (erro) {
            console.error(erro);
            setErroNoticias(true);
        }
    }

    function fecharModal() {
        setModalAberto(false);
        setNomeUsuario("");
        setTextoComentario("");
    }

    async function publicarComentario(evento) {
        evento.preventDefault();

        const usuario = nomeUsuario.trim();
        const texto = textoComentario.trim();

        if (!usuario || !texto) {
            alert("Preencha o nome de usuário e o comentário.");
            return;
        }

        if (usuario.length > 30) {
            alert("O nome de usuário deve ter no máximo 30 caracteres.");
            return;
        }

        if (texto.length > 150) {
            alert("O comentário deve ter no máximo 150 caracteres.");
            return;
        }

        try {
            setPublicando(true);

            await api.criarComentario({
                usuario,
                texto
            });

            await carregarComentarios();
            fecharModal();
        } catch (erro) {
            console.error(erro);
            alert(
                erro.message ||
                "Não foi possível publicar o comentário."
            );
        } finally {
            setPublicando(false);
        }
    }

    function acompanharDenuncia() {
        const codigo = protocolo.trim().toUpperCase();

        if (!codigo) {
            alert("Digite o protocolo da denúncia.");
            return;
        }

        sessionStorage.setItem("protocoloConsulta", codigo);
        navigate("/acompanhar-estudante");
    }

    return (
        <>
            <header>
                <Link
                    to="/"
                    className="voltarInicio"
                    aria-label="Voltar para a página inicial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path
                            fill="currentColor"
                            d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352H544C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288H173.3L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.4Z"
                        />
                    </svg>

                    <span>Voltar ao início</span>
                </Link>

                <div className="title">
                    <span className="etiquetaHeader">
                        Portal do estudante
                    </span>

                    <h1 id="titulo">Bem-vindo</h1>

                    <p className="descricaoHeader">
                        Acompanhe sua denúncia, participe da comunidade escolar
                        e fique por dentro das principais notícias do portal.
                    </p>

                    <div className="recursosHeader">
                        <span>Comentários</span>
                        <span>Acompanhamento seguro</span>
                        <span>Notícias</span>
                    </div>

                    <a href="#areaEstudante" className="botaoExplorar">
                        Acessar área do estudante
                    </a>
                </div>
            </header>

            <main id="areaEstudante">
                <section>
                    <div className="containners">
                        <div className="contanner1">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path
                                            fill="currentColor"
                                            d="M96 96C78.3 96 64 110.3 64 128V448C64 465.7 78.3 480 96 480H192V560L298.7 480H544C561.7 480 576 465.7 576 448V128C576 110.3 561.7 96 544 96H96Z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <span className="categoriaCard">
                                        Comunidade
                                    </span>
                                    <h2>Comentários</h2>
                                </div>
                            </div>

                            <div className="listaComentarios">
                                {[0, 1, 2, 3].map((indice) => {
                                    const comentario = comentarios[indice];

                                    let usuario = "@usuario:";
                                    let texto = "Nenhum comentário publicado.";

                                    if (erroComentarios) {
                                        texto = "Não foi possível carregar os comentários.";
                                    } else if (comentario) {
                                        usuario = `@${comentario.usuario}:`;
                                        texto = comentario.texto;
                                    }

                                    return (
                                        <div
                                            className={`comentario${indice + 1}`}
                                            key={comentario?.id ?? indice}
                                        >
                                            <div className="avatarComentario">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    <path
                                                        fill="currentColor"
                                                        d={iconeUsuario}
                                                    />
                                                </svg>
                                            </div>

                                            <div className="conteudoComentario">
                                                <h3>{usuario}</h3>
                                                <p>{texto}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="botaoComente">
                                <button
                                    type="button"
                                    id="abrirComentario"
                                    onClick={() => setModalAberto(true)}
                                >
                                    Comente
                                </button>
                            </div>
                        </div>

                        <div className="contanner2">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path
                                            fill="currentColor"
                                            d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64ZM424 252C433.4 242.6 433.4 227.4 424 218C414.6 208.6 399.4 208.6 390 218L288 320L250 282C240.6 272.6 225.4 272.6 216 282C206.6 291.4 206.6 306.6 216 316L271 371C280.4 380.4 295.6 380.4 305 371L424 252Z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <span className="categoriaCard">
                                        Consulta segura
                                    </span>
                                    <h2>Acompanhar denúncia</h2>
                                </div>
                            </div>

                            <p className="descricaoCard">
                                Consulte o andamento da sua denúncia informando
                                o número de protocolo recebido no momento do envio.
                            </p>

                            <div className="campoProtocolo">
                                <label htmlFor="protocolo">
                                    Número do protocolo
                                </label>

                                <input
                                    type="text"
                                    id="protocolo"
                                    name="protocolo"
                                    placeholder="Digite o número do protocolo"
                                    value={protocolo}
                                    onChange={(evento) =>
                                        setProtocolo(evento.target.value)
                                    }
                                    onKeyDown={(evento) => {
                                        if (evento.key === "Enter") {
                                            acompanharDenuncia();
                                        }
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                id="botaoAcompanhar"
                                onClick={acompanharDenuncia}
                            >
                                Acompanhar
                            </button>

                            <div className="segurancaConsulta">
                                <div className="iconeSeguranca">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path
                                            fill="currentColor"
                                            d="M192 272V208C192 137.3 249.3 80 320 80C390.7 80 448 137.3 448 208V272H480C497.7 272 512 286.3 512 304V528C512 545.7 497.7 560 480 560H160C142.3 560 128 545.7 128 528V304C128 286.3 142.3 272 160 272H192ZM256 272H384V208C384 172.7 355.3 144 320 144C284.7 144 256 172.7 256 208V272Z"
                                        />
                                    </svg>
                                </div>

                                <p>
                                    Sua denúncia é sigilosa e o protocolo garante
                                    segurança durante todo o acompanhamento.
                                </p>
                            </div>
                        </div>

                        <div className="contanner3">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path
                                            fill="currentColor"
                                            d="M96 96C78.3 96 64 110.3 64 128V512C64 529.7 78.3 544 96 544H544C561.7 544 576 529.7 576 512V128C576 110.3 561.7 96 544 96H96ZM160 176H480V240H160V176ZM160 288H480V352H160V288ZM160 400H352V464H160V400Z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <span className="categoriaCard">
                                        Informações
                                    </span>
                                    <h2>Notícias</h2>
                                </div>
                            </div>

                            <div className="listaNoticias">
                                {[0, 1].map((indice) => {
                                    const noticia = noticias[indice];

                                    let texto = "Nenhuma notícia publicada.";

                                    if (erroNoticias) {
                                        texto = "Não foi possível carregar as notícias.";
                                    } else if (noticia) {
                                        texto = noticia.texto;
                                    }

                                    return (
                                        <div
                                            className={`noticia${indice + 1}`}
                                            key={noticia?.id ?? indice}
                                        >
                                            <div className="iconeNoticia">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    <path
                                                        fill="currentColor"
                                                        d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64Z"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="conteudoNoticia">
                                                <span>
                                                    {indice === 0
                                                        ? "Destaque"
                                                        : "Atualização"}
                                                </span>

                                                <p>{texto}</p>

                                                <a
                                                    href="#areaEstudante"
                                                    onClick={(evento) =>
                                                        evento.preventDefault()
                                                    }
                                                >
                                                    Ler mais
                                                    <span>→</span>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="copyright">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
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

            <div
                className={`modalComentario ${modalAberto ? "ativo" : ""}`}
                id="modalComentario"
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        fecharModal();
                    }
                }}
            >
                <div className="janelaComentario">
                    <button
                        type="button"
                        className="fecharComentario"
                        id="fecharComentario"
                        onClick={fecharModal}
                    >
                        ✕
                    </button>

                    <h2>Deixe seu comentário</h2>

                    <form id="formComentario" onSubmit={publicarComentario}>
                        <div className="campoComentario">
                            <label htmlFor="nomeUsuario">
                                Nome de usuário
                            </label>

                            <input
                                type="text"
                                id="nomeUsuario"
                                placeholder="Exemplo: Gabriel"
                                maxLength={30}
                                value={nomeUsuario}
                                onChange={(evento) =>
                                    setNomeUsuario(evento.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="campoComentario">
                            <label htmlFor="textoComentario">
                                Comentário
                            </label>

                            <textarea
                                id="textoComentario"
                                rows={5}
                                maxLength={150}
                                placeholder="Escreva seu comentário..."
                                value={textoComentario}
                                onChange={(evento) =>
                                    setTextoComentario(evento.target.value)
                                }
                                required
                            />

                            <div className="contadorComentario">
                                <span id="quantidadeCaracteres">
                                    {textoComentario.length}
                                </span>
                                /150
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="botaoPublicarComentario"
                            disabled={publicando}
                        >
                            {publicando ? "Publicando..." : "Comentar"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Estudante;