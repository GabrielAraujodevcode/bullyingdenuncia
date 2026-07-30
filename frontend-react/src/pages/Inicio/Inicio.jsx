import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Inicio.css";
import "../../styles/denuncias.css";
import { api } from "../../services/api";

function Inicio() {
    const [modalAberto, setModalAberto] = useState(false);
    const [modalProtocoloAberto, setModalProtocoloAberto] = useState(false);
    const [codigoProtocolo, setCodigoProtocolo] = useState("");


    useEffect(() => {
    const cards = document.querySelectorAll(
        ".contanner1, .contanner2, .contanner3"
    );

    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("cardVisivel");
                    observador.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    cards.forEach((card) => {
        observador.observe(card);
    });

    return () => {
        observador.disconnect();
    };
}, []);

    function fecharFormulario() {
        setModalAberto(false);
    }

    function fecharProtocolo() {
        setModalProtocoloAberto(false);
    }

async function handleSubmit(event) {
    event.preventDefault();

    const formulario = event.currentTarget;
    const dadosFormulario = new FormData(formulario);

    const dados = {
        usuarioAnonimo: dadosFormulario
            .get("usuarioAnonimo")
            ?.trim(),

        localOcorrencia:
            dadosFormulario.get("localOcorrencia"),

        agressorDescricao: dadosFormulario
            .get("agressorDescricao")
            ?.trim(),

        tipoBullying:
            dadosFormulario.get("tipoBullying"),

        relato: dadosFormulario
            .get("relato")
            ?.trim()
    };

    if (
        !dados.usuarioAnonimo ||
        !dados.localOcorrencia ||
        !dados.agressorDescricao ||
        !dados.tipoBullying ||
        !dados.relato
    ) {
        alert("Preencha todos os campos da denúncia.");
        return;
    }

    try {
        const resultado = await api.criarDenuncia(dados);

        if (!resultado.denuncia?.protocolo) {
            throw new Error(
                "A API não retornou o protocolo."
            );
        }

        setCodigoProtocolo(
            resultado.denuncia.protocolo
        );

        setModalAberto(false);
        setModalProtocoloAberto(true);

        formulario.reset();
    } catch (erro) {
        console.error("Erro ao enviar denúncia:", erro);

        alert(
            erro.message ||
            "Não foi possível enviar a denúncia."
        );
    }
}

    return (
        <>
            {/* Header */}

            <header>
                <div className="title">
                    <span className="etiquetaHeader">
                        Portal seguro e confidencial
                    </span>

                    <h1 id="titulo1">Bullying?</h1>

                    <h2 id="titulo2">Denuncie de forma anônima</h2>

                    <p className="descricaoHeader">
                        Um canal protegido para estudantes relatarem situações de bullying,
                        acompanharem suas denúncias e contribuírem para uma escola mais segura.
                    </p>

                    <div className="segurancaHeader">
                        <span>✓ Identidade protegida</span>
                        <span>✓ Denúncia confidencial</span>
                        <span>✓ Acompanhamento seguro</span>
                    </div>

                    <a href="#conteudoPrincipal" className="botaoExplorar">
                        Conheça o portal
                        <span>↓</span>
                    </a>
                </div>
            </header>

            {/* Main */}

            <main id="conteudoPrincipal">
                <section>
                    <div className="containners">
                        <div className="contanner1">
                            <div id="servicos">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path fill="rgb(12, 36, 102)" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                                </svg>
                                <h2>Serviços</h2>
                            </div>

                            <p>
                                Canal seguro para Denúncias Anônimas,
                                <br />
                                promovendo segurança, respeito e
                                <br />
                                bem-estar escolar.
                            </p>

                            <Link to="/servicos">
                                <button type="button">CONFIRA</button>
                            </Link>
                        </div>

                        <div className="contanner2">
                            <div id="estudante">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path fill="rgb(12, 36, 102)" d="M337.3 51C325.9 48.7 314.2 48.7 302.8 51L115.3 88.5C104.1 90.7 96 100.6 96 112C96 122.3 102.5 131.3 112 134.6L112 208L96.3 286.6C96.1 287.5 96 288.5 96 289.5C96 297.5 102.5 304.1 110.6 304.1L145.5 304.1C153.5 304.1 160.1 297.6 160.1 289.5C160.1 288.5 160 287.6 159.8 286.6L144 208L144 141.3L192 150.9L192 208C192 278.7 249.3 336 320 336C390.7 336 448 278.7 448 208L448 150.9L524.7 135.6C535.9 133.3 544 123.4 544 112C544 100.6 535.9 90.7 524.7 88.5L337.3 51zM320 288C275.8 288 240 252.2 240 208L400 208C400 252.2 364.2 288 320 288zM216.1 384.1C154.7 412.3 112 474.3 112 546.3C112 562.7 125.3 576 141.7 576L296 576L296 430L238.6 387C232.1 382.1 223.4 380.8 216 384.2zM344 576L498.3 576C514.7 576 528 562.7 528 546.3C528 474.3 485.3 412.3 423.9 384.2C416.5 380.8 407.8 382.1 401.3 387L343.9 430L343.9 576z" />
                                </svg>
                                <h2>Estudante</h2>
                            </div>

                            <p>
                                Acompanhe denúncias, receba
                                <br />
                                atualizações e contribua para uma
                                <br />
                                escola mais segura.
                            </p>

                            <Link to="/estudante">
                                <button type="button">ACOMPANHE</button>
                            </Link>
                        </div>

                        <div className="contanner3">
                            <div id="secretaria">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path fill="rgb(12, 36, 102)" d="M32 256C32 220.7 60.7 192 96 192L160 192L287.9 76.9C306.2 60.5 333.9 60.5 352.1 76.9L480 192L544 192C579.3 192 608 220.7 608 256L608 512C608 547.3 579.3 576 544 576L96 576C60.7 576 32 547.3 32 512L32 256zM256 440L256 528L384 528L384 440C384 417.9 366.1 400 344 400L296 400C273.9 400 256 417.9 256 440zM144 448C152.8 448 160 440.8 160 432L160 400C160 391.2 152.8 384 144 384L112 384C103.2 384 96 391.2 96 400L96 432C96 440.8 103.2 448 112 448L144 448zM160 304L160 272C160 263.2 152.8 256 144 256L112 256C103.2 256 96 263.2 96 272L96 304C96 312.8 103.2 320 112 320L144 320C152.8 320 160 312.8 160 304zM528 448C536.8 448 544 440.8 544 432L544 400C544 391.2 536.8 384 528 384L496 384C487.2 384 480 391.2 480 400L480 432C480 440.8 487.2 448 496 448L528 448zM544 304L544 272C544 263.2 536.8 256 528 256L496 256C487.2 256 480 263.2 480 272L480 304C480 312.8 487.2 320 496 320L528 320C536.8 320 544 312.8 544 304zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
                                </svg>
                                <h2>Secretaria</h2>
                            </div>

                            <p>
                                Gerencie denúncias, acompanhe
                                <br />
                                ocorrências e facilite a comunicação
                                <br />
                                com a comunidade escolar.
                            </p>

                            <Link to="/login">
                                <button type="button">GERENCIE</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Atalho */}

            <div className="atalhoDenuncia">
                <a href="#areaDenuncia">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path fill="currentColor" d="M320 64C178.6 64 64 178.6 64 320S178.6 576 320 576 576 461.4 576 320 461.4 64 320 64zm24 136v176l72-72 34 34-130 130-130-130 34-34 72 72V200h48z" />
                    </svg>
                    <span>Ir para denúncia</span>
                </a>
            </div>

            {/* Footer */}

            <footer id="areaDenuncia">
                <section className="ctaDenuncia">
                    <div className="ctaIcone">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path fill="currentColor" d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64Z" />
                        </svg>
                    </div>

                    <span className="ctaBadge">CANAL SEGURO</span>

                    <h2>Faça uma denúncia anônima</h2>

                    <p>
                        Sua identidade permanece protegida durante todo o processo.
                        Utilize este canal para comunicar situações de bullying de
                        forma segura e confidencial.
                    </p>

                    <button type="button" id="abrirFormulario" onClick={() => setModalAberto(true)}>
                        Fazer denúncia
                    </button>
                </section>

                <div className="copyright">
                    <p>
                        © 2026 Portal de Denúncias • Desenvolvido por
                        <strong> Gabriel Araújo</strong>
                    </p>
                </div>
            </footer>

            {/* Modal denúncia */}

            <div
                className={`modal ${modalAberto ? "ativo" : ""}`}
                id="modal"
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) fecharFormulario();
                }}
            >
                <div className="janelaFormulario">
                    <button type="button" className="fechar" id="fecharFormulario" onClick={fecharFormulario}>
                        ✕
                    </button>

                    <h2>Denúncia Anônima</h2>

                    <form id="formDenuncia" onSubmit={handleSubmit}>
                        <div className="campo">
                            <label htmlFor="usuarioAnonimo">Usuário</label>
                            <input type="text" id="usuarioAnonimo" name="usuarioAnonimo" placeholder="Crie um nome de usuário" maxLength={50} required />
                        </div>

                        <div className="campo">
                            <label htmlFor="localOcorrencia">Onde ocorreu?</label>
                            <select id="localOcorrencia" name="localOcorrencia" required>
                                <option value="Sala">Sala</option>
                                <option value="Pátio">Pátio</option>
                                <option value="Corredor">Corredor</option>
                                <option value="Banheiro">Banheiro</option>
                                <option value="Internet">Internet</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="agressorDescricao">Quem praticou?</label>
                            <textarea id="agressorDescricao" name="agressorDescricao" rows={3} maxLength={500} required />
                        </div>

                        <div className="campo">
                            <label htmlFor="tipoBullying">Tipo de Bullying</label>
                            <select id="tipoBullying" name="tipoBullying" required>
                                <option value="Verbal">Verbal</option>
                                <option value="Físico">Físico</option>
                                <option value="Psicológico">Psicológico</option>
                                <option value="Social">Social</option>
                                <option value="Cyberbullying">Cyberbullying</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="relato">Relato</label>
                            <textarea id="relato" name="relato" rows={6} maxLength={2000} required />
                        </div>

                        <button className="btnEnviar" type="submit">Enviar Denúncia</button>
                    </form>
                </div>
            </div>

            {/* Modal protocolo */}

            <div
                className={`modal ${modalProtocoloAberto ? "ativo" : ""}`}
                id="modalProtocolo"
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) fecharProtocolo();
                }}
            >
                <div className="janelaProtocolo">
                    <button type="button" className="fechar" id="fecharProtocolo" onClick={fecharProtocolo}>✕</button>
                    <div className="iconeSucesso">✓</div>
                    <h2>Denúncia enviada!</h2>
                    <p>Sua denúncia foi registrada com sucesso.</p>
                    <p className="tituloProtocolo">Seu número de protocolo é:</p>
                    <strong id="codigoProtocolo">{codigoProtocolo}</strong>
                    <p className="avisoProtocolo">Guarde este código para futuras consultas.</p>
                    <button type="button" className="btnProtocolo" id="confirmarProtocolo" onClick={fecharProtocolo}>Entendi</button>
                </div>
            </div>
        </>
    );
}

export default Inicio;