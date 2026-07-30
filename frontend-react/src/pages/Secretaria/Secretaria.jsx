import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../services/api";

import "./secretaria.css";

const iconeUsuario =
    "M320 320C390.7 320 448 262.7 448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320ZM144 576H496C513.7 576 528 561.7 528 544C528 438 442 352 336 352H304C198 352 112 438 112 544C112 561.7 126.3 576 144 576Z";

function Secretaria() {
    const navigate = useNavigate();

    const [comentarios, setComentarios] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [denuncias, setDenuncias] = useState([]);

    const [modalComentario, setModalComentario] = useState(false);
    const [modalEditarComentarios, setModalEditarComentarios] = useState(false);
    const [modalNoticia, setModalNoticia] = useState(false);
    const [modalEditarNoticias, setModalEditarNoticias] = useState(false);

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [textoComentario, setTextoComentario] = useState("");
    const [textoNoticia, setTextoNoticia] = useState("");


    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("tokenAdministrador");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        carregarTudo();
    }, [navigate]);

    async function carregarTudo() {
        try {
            setCarregando(true);

            await Promise.all([
                carregarComentarios(),
                carregarNoticias(),
                carregarDenuncias()
            ]);
        } finally {
            setCarregando(false);
        }
    }

    async function carregarComentarios() {
        try {
            const resultado = await api.listarComentarios();
            setComentarios(resultado.comentarios ?? []);
        } catch (erro) {
            console.error(erro);
            setComentarios([]);
        }
    }

    async function carregarNoticias() {
        try {
            const resultado = await api.listarNoticias();
            setNoticias(resultado.noticias ?? []);
        } catch (erro) {
            console.error(erro);
            setNoticias([]);
        }
    }

    async function carregarDenuncias() {
        try {
            const resultado = await api.listarDenuncias();
            setDenuncias(resultado.denuncias ?? []);
        } catch (erro) {
            console.error(erro);

            if (
                erro.status === 401 ||
                erro.status === 403 ||
                erro.message?.toLowerCase().includes("token")
            ) {
                sair();
                return;
            }

            setDenuncias([]);
        }
    }

    function sair() {
        localStorage.removeItem("tokenAdministrador");
        localStorage.removeItem("administrador");
        navigate("/login", { replace: true });
    }

    async function publicarComentario(evento) {
        evento.preventDefault();

        const usuario = nomeUsuario.trim();
        const texto = textoComentario.trim();

        if (!usuario || !texto) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            setSalvando(true);

            await api.criarComentario({ usuario, texto });

            setNomeUsuario("");
            setTextoComentario("");
            setModalComentario(false);
            await carregarComentarios();
        } catch (erro) {
            console.error(erro);
            alert(erro.message || "Não foi possível publicar o comentário.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirComentario(id) {
        if (!confirm("Deseja excluir este comentário?")) return;

        try {
            await api.excluirComentario(id);
            await carregarComentarios();
        } catch (erro) {
            console.error(erro);
            alert(erro.message || "Não foi possível excluir o comentário.");
        }
    }

    async function publicarNoticia(evento) {
        evento.preventDefault();

        const texto = textoNoticia.trim();

        if (!texto) {
            alert("Digite a notícia.");
            return;
        }

        try {
            setSalvando(true);

            await api.criarNoticia({ texto });

            setTextoNoticia("");
            setModalNoticia(false);
            await carregarNoticias();
        } catch (erro) {
            console.error(erro);
            alert(erro.message || "Não foi possível publicar a notícia.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirNoticia(id) {
        if (!confirm("Deseja excluir esta notícia?")) return;

        try {
            await api.excluirNoticia(id);
            await carregarNoticias();
        } catch (erro) {
            console.error(erro);
            alert(erro.message || "Não foi possível excluir a notícia.");
        }
    }

    return (
        <>
            <header>
                <div className="title">
                    <span className="etiquetaHeader">
                        Painel administrativo
                    </span>

                    <div className="iconeHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path
                                fill="currentColor"
                                d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64ZM288 224V288H224V352H288V416H352V352H416V288H352V224H288Z"
                            />
                        </svg>
                    </div>

                    <h1 id="titulo">Área da Secretaria</h1>

                    <p className="descricaoHeader">
                        Gerencie denúncias, publique comunicados, acompanhe protocolos
                        e mantenha a comunidade escolar informada com segurança.
                    </p>

                    <div className="recursosHeader">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                <path fill="currentColor" d="M96 128C60.7 128 32 156.7 32 192V416C32 451.3 60.7 480 96 480H208L304 560V480H544C579.3 480 608 451.3 608 416V192C608 156.7 579.3 128 544 128H96Z" />
                            </svg>
                            Comentários
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                <path fill="currentColor" d="M96 96C78.3 96 64 110.3 64 128V512C64 529.7 78.3 544 96 544H544C561.7 544 576 529.7 576 512V128C576 110.3 561.7 96 544 96H96ZM160 176H480V240H160V176ZM160 288H480V352H160V288ZM160 400H352V464H160V400Z" />
                            </svg>
                            Gestão de denúncias
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                <path fill="currentColor" d="M96 128C78.3 128 64 142.3 64 160V480C64 497.7 78.3 512 96 512H544C561.7 512 576 497.7 576 480V160C576 142.3 561.7 128 544 128H96ZM128 208H512V272H128V208ZM128 320H368V384H128V320Z" />
                            </svg>
                            Comunicados
                        </span>
                    </div>

                    <a href="#painelAdministrativo" className="botaoExplorar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                            <path fill="currentColor" d="M320 512L96 288L141.3 242.7L288 389.4V64H352V389.4L498.7 242.7L544 288L320 512Z" />
                        </svg>
                        Acessar painel
                    </a>
                </div>

                <button
                    id="botaoSair"
                    className="botaoSair"
                    type="button"
                    onClick={sair}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                        <path fill="currentColor" d="M192 96H416C433.7 96 448 110.3 448 128V224H384V160H224V480H384V416H448V512C448 529.7 433.7 544 416 544H192C174.3 544 160 529.7 160 512V128C160 110.3 174.3 96 192 96ZM409.4 274.7L454.7 229.4L545.3 320L454.7 410.6L409.4 365.3L422.7 352H288V288H422.7L409.4 274.7Z" />
                    </svg>
                    Sair
                </button>
            </header>

            <main id="painelAdministrativo">
                <section>
                    <div className="introducaoPainel">
                        <span>Painel administrativo</span>
                        <h2>Gerencie o portal escolar</h2>
                        <p>
                            Controle os comentários, acompanhe as denúncias recebidas
                            e publique informações importantes para os estudantes.
                        </p>
                    </div>

                    <div className="containners">
                        <div className="contanner1">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                        <path fill="currentColor" d="M96 128C60.7 128 32 156.7 32 192V416C32 451.3 60.7 480 96 480H208L304 560V480H544C579.3 480 608 451.3 608 416V192C608 156.7 579.3 128 544 128H96Z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="categoriaCard">Comunidade</span>
                                    <h2>Comentários</h2>
                                </div>
                            </div>

                            <div className="listaComentarios">
                                {[0, 1, 2, 3].map((indice) => {
                                    const comentario = comentarios[indice];

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
                                                <h3>
                                                    {comentario
                                                        ? `@${comentario.usuario}`
                                                        : "@usuario"}
                                                </h3>

                                                <p>
                                                    {comentario?.texto ||
                                                        "Nenhum comentário publicado."}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="botoes">
                                <button
                                    type="button"
                                    id="abrirComentario"
                                    onClick={() => setModalComentario(true)}
                                >
                                    Comentar
                                </button>

                                <button
                                    type="button"
                                    id="botaoEditar"
                                    onClick={() => setModalEditarComentarios(true)}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>

                        <div className="contanner2">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                        <path fill="currentColor" d="M96 96C78.3 96 64 110.3 64 128V512C64 529.7 78.3 544 96 544H544C561.7 544 576 529.7 576 512V128C576 110.3 561.7 96 544 96H96ZM160 176H480V240H160V176ZM160 288H480V352H160V288ZM160 400H352V464H160V400Z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="categoriaCard">
                                        Administração
                                    </span>
                                    <h2>Gerenciar denúncias</h2>
                                </div>
                            </div>

                            <p className="descricaoCard">
                                Acesse as denúncias registradas, consulte os relatos
                                e mantenha o estudante informado.
                            </p>

                            <div className="resumoDenuncias">
                                <strong>{denuncias.length}</strong>
                                <span>denúncia(s) registrada(s)</span>
                            </div>

                            <Link to="/acompanhar-secretaria">
                                <button className="acompanhar" type="button">
                                    Acompanhar denúncias
                                </button>
                            </Link>
                        </div>

                        <div className="contanner3">
                            <div className="tituloCard">
                                <div className="iconeTituloCard">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
                                        <path fill="currentColor" d="M96 128C78.3 128 64 142.3 64 160V480C64 497.7 78.3 512 96 512H544C561.7 512 576 497.7 576 480V160C576 142.3 561.7 128 544 128H96ZM128 208H512V272H128V208ZM128 320H368V384H128V320Z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="categoriaCard">
                                        Comunicação
                                    </span>
                                    <h2>Notícias</h2>
                                </div>
                            </div>

                            <div className="listaNoticias">
                                {[0, 1].map((indice) => {
                                    const noticia = noticias[indice];

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

                                                <p>
                                                    {noticia?.texto ||
                                                        "Nenhuma notícia publicada."}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="botoes">
                                <button
                                    type="button"
                                    id="abrirNoticia"
                                    onClick={() => setModalNoticia(true)}
                                >
                                    Publicar
                                </button>

                                <button
                                    type="button"
                                    id="editarNoticias"
                                    onClick={() => setModalEditarNoticias(true)}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>

                </section>
            </main>

            <footer>
                <div className="copyright">
                    <p>
                        © 2026 Portal de Denúncias • Desenvolvido por
                        <strong> Gabriel Araújo</strong>
                    </p>
                </div>
            </footer>

            <div
                className={`modalComentario ${
                    modalComentario ? "ativo" : ""
                }`}
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        setModalComentario(false);
                    }
                }}
            >
                <div className="janelaComentario">
                    <button
                        type="button"
                        className="fecharComentario"
                        onClick={() => setModalComentario(false)}
                    >
                        ✕
                    </button>

                    <h2>Deixe seu comentário</h2>

                    <form onSubmit={publicarComentario}>
                        <div className="campoComentario">
                            <label htmlFor="nomeUsuario">Nome de usuário</label>

                            <input
                                id="nomeUsuario"
                                type="text"
                                maxLength={20}
                                value={nomeUsuario}
                                onChange={(evento) =>
                                    setNomeUsuario(evento.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="campoComentario">
                            <label htmlFor="textoComentario">Comentário</label>

                            <textarea
                                id="textoComentario"
                                rows={5}
                                maxLength={60}
                                value={textoComentario}
                                onChange={(evento) =>
                                    setTextoComentario(evento.target.value)
                                }
                                required
                            />

                            <div className="contadorComentario">
                                {textoComentario.length}/60
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="botaoPublicarComentario"
                            disabled={salvando}
                        >
                            {salvando ? "Publicando..." : "Comentar"}
                        </button>
                    </form>
                </div>
            </div>

            <div
                className={`modalEditar ${
                    modalEditarComentarios ? "ativo" : ""
                }`}
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        setModalEditarComentarios(false);
                    }
                }}
            >
                <div className="janelaEditar">
                    <button
                        type="button"
                        className="fecharEditar"
                        onClick={() => setModalEditarComentarios(false)}
                    >
                        ✕
                    </button>

                    <h2>Editar comentários</h2>

                    <div id="listaEditarComentarios">
                        {comentarios.length === 0 ? (
                            <p>Nenhum comentário publicado.</p>
                        ) : (
                            comentarios.map((comentario) => (
                                <div className="itemEditar" key={comentario.id}>
                                    <div>
                                        <strong>@{comentario.usuario}</strong>
                                        <p>{comentario.texto}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            excluirComentario(comentario.id)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`modalNoticia ${modalNoticia ? "ativo" : ""}`}
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        setModalNoticia(false);
                    }
                }}
            >
                <div className="janelaNoticia">
                    <button
                        type="button"
                        className="fecharNoticia"
                        onClick={() => setModalNoticia(false)}
                    >
                        ✕
                    </button>

                    <h2>Publicar notícia</h2>

                    <form onSubmit={publicarNoticia}>
                        <div className="campoNoticia">
                            <label htmlFor="textoNoticia">
                                Digite a notícia
                            </label>

                            <textarea
                                id="textoNoticia"
                                rows={5}
                                maxLength={200}
                                value={textoNoticia}
                                onChange={(evento) =>
                                    setTextoNoticia(evento.target.value)
                                }
                                required
                            />

                            <div className="contadorNoticia">
                                {textoNoticia.length}/200
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="botaoPublicarNoticia"
                            disabled={salvando}
                        >
                            {salvando ? "Publicando..." : "Publicar notícia"}
                        </button>
                    </form>
                </div>
            </div>

            <div
                className={`modalEditarNoticias ${
                    modalEditarNoticias ? "ativo" : ""
                }`}
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        setModalEditarNoticias(false);
                    }
                }}
            >
                <div className="janelaEditarNoticias">
                    <button
                        type="button"
                        className="fecharEditarNoticias"
                        onClick={() => setModalEditarNoticias(false)}
                    >
                        ✕
                    </button>

                    <h2>Editar notícias</h2>

                    <div id="listaEditarNoticias">
                        {noticias.length === 0 ? (
                            <p>Nenhuma notícia publicada.</p>
                        ) : (
                            noticias.map((noticia) => (
                                <div className="itemEditar" key={noticia.id}>
                                    <p>{noticia.texto}</p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            excluirNoticia(noticia.id)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Secretaria;