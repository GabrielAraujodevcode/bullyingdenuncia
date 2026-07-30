import { useEffect, useState } from "react";
import { Link } from "react-router";

import "./servicos.css";
import "../../styles/denuncias.css";

import { api } from "../../services/api";

const caminhoCheck =
    "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z";

function IconeCheck() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d={caminhoCheck} />
        </svg>
    );
}

function Servicos() {
    const [modalAberto, setModalAberto] = useState(false);
    const [modalProtocoloAberto, setModalProtocoloAberto] = useState(false);
    const [codigoProtocolo, setCodigoProtocolo] = useState("");
    const [enviando, setEnviando] = useState(false);

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

        cards.forEach((card) => observador.observe(card));

        return () => observador.disconnect();
    }, []);

    function fecharFormulario() {
        setModalAberto(false);
    }

    function fecharProtocolo() {
        setModalProtocoloAberto(false);
    }

    async function enviarDenuncia(evento) {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const dadosFormulario = new FormData(formulario);

        const dados = {
            usuarioAnonimo: dadosFormulario.get("usuarioAnonimo")?.trim(),
            localOcorrencia: dadosFormulario.get("localOcorrencia"),
            agressorDescricao: dadosFormulario.get("agressorDescricao")?.trim(),
            tipoBullying: dadosFormulario.get("tipoBullying"),
            relato: dadosFormulario.get("relato")?.trim()
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
            setEnviando(true);

const resultado = await api.criarDenuncia(dados);

            if (!resultado.denuncia?.protocolo) {
                throw new Error(
                    "O protocolo não foi retornado pela API."
                );
            }

            setCodigoProtocolo(resultado.denuncia.protocolo);
            setModalAberto(false);
            setModalProtocoloAberto(true);
            formulario.reset();
        } catch (erro) {
            console.error(erro);

            alert(
                erro.message ||
                "Não foi possível enviar a denúncia."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <>
            {/* Header */}

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

                    <span></span>
                </Link>

                <div className="title">
                    <span className="etiquetaHeader">
                        Recursos do portal
                    </span>

                    <h1 id="titulo1">
                        Serviços
                    </h1>

                    <p className="descricaoHeader">
                        Acesse recursos desenvolvidos para orientar estudantes,
                        facilitar denúncias e ajudar toda a comunidade escolar
                        a identificar e combater situações de bullying.
                    </p>

                    <div className="recursosHeader">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64ZM424 252C433.4 242.6 433.4 227.4 424 218C414.6 208.6 399.4 208.6 390 218L288 320L250 282C240.6 272.6 225.4 272.6 216 282C206.6 291.4 206.6 306.6 216 316L271 371C280.4 380.4 295.6 380.4 305 371L424 252Z"
                                />
                            </svg>

                            Canal protegido
                        </span>

                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64ZM320 176C346.5 176 368 197.5 368 224C368 250.5 346.5 272 320 272C293.5 272 272 250.5 272 224C272 197.5 293.5 176 320 176ZM416 448H224V416C224 363 267 320 320 320C373 320 416 363 416 416V448Z"
                                />
                            </svg>

                            Apoio ao estudante
                        </span>

                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M96 96C78.3 96 64 110.3 64 128V512C64 529.7 78.3 544 96 544H544C561.7 544 576 529.7 576 512V128C576 110.3 561.7 96 544 96H96ZM176 192H464C477.3 192 488 202.7 488 216C488 229.3 477.3 240 464 240H176C162.7 240 152 229.3 152 216C152 202.7 162.7 192 176 192ZM176 296H464C477.3 296 488 306.7 488 320C488 333.3 477.3 344 464 344H176C162.7 344 152 333.3 152 320C152 306.7 162.7 296 176 296ZM176 400H352C365.3 400 376 410.7 376 424C376 437.3 365.3 448 352 448H176C162.7 448 152 437.3 152 424C152 410.7 162.7 400 176 400Z"
                                />
                            </svg>

                            Materiais educativos
                        </span>
                    </div>

                    <a href="#conteudoServicos" className="botaoExplorar">
                        Conhecer os serviços

                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7V96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96V466.7L182.6 361.4C170.1 348.9 149.8 348.9 137.3 361.4C124.8 373.9 124.8 394.2 137.3 406.7L297.4 566.6Z"
                                />
                            </svg>
                        </span>
                    </a>
                </div>
            </header>

            {/* Main */}

            <main id="conteudoServicos">
                <section>
                    <div className="containners">
                        <div className="contanner1">
                            <span className="categoriaCard">
                                SERVIÇO
                            </span>

                            <div id="denuncias">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="rgb(12, 36, 102)"
                                        d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
                                    />
                                </svg>

                                <h2>Denúncias</h2>
                            </div>

                            <p>
                                Canal seguro para comunicar situações de bullying.
                            </p>

                            <ul className="listaCard">
                                <li>
                                    <IconeCheck />
                                    <span>100% Anônimo</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Protocolo automático</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Acompanhamento online</span>
                                </li>
                            </ul>

                            <div className="divisorCard"></div>

                            <button
                                type="button"
                                id="abrirFormulario"
                                onClick={() => setModalAberto(true)}
                            >
                                Acessar
                                <span className="setaCard">→</span>
                            </button>
                        </div>

                        <div className="contanner2">
                            <span className="categoriaCard">
                                GUIA
                            </span>

                            <div id="apoio">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="rgb(12, 36, 102)"
                                        d="M300.9 117.2L184.3 246.8C179.7 251.9 179.9 259.8 184.8 264.7C215.3 295.2 264.8 295.2 295.3 264.7L327.1 232.9C331.3 228.7 336.6 226.4 342 226C348.8 225.4 355.8 227.7 361 232.9L537.6 408L608 352L608 64L496 128L472.2 112.1C456.4 101.6 437.9 96 418.9 96L348.5 96C347.4 96 346.2 96 345.1 96.1C328.2 97 312.3 104.6 300.9 117.2zM148.6 214.7L255.4 96L215.8 96C190.3 96 165.9 106.1 147.9 124.1L32 256L32 608L176 472L188.4 482.3C211.4 501.5 240.4 512 270.3 512L286 512L279 505C269.6 495.6 269.6 480.4 279 471.1C288.4 461.8 303.6 461.7 312.9 471.1L353.9 512.1L362.9 512.1C382 512.1 400.7 507.8 417.7 499.8L391 473C381.6 463.6 381.6 448.4 391 439.1C400.4 429.8 415.6 429.7 424.9 439.1L456.9 471.1L474.4 453.6C483.3 444.7 485.9 431.8 482 420.5L344.1 283.7L329.2 298.6C279.9 347.9 200.1 347.9 150.8 298.6C127.8 275.6 126.9 238.7 148.6 214.6z"
                                    />
                                </svg>

                                <h2>Apoio ao Estudante</h2>
                            </div>

                            <p>
                                Encontre orientação e apoio para lidar com situações de bullying.
                            </p>

                            <ul className="listaCard">
                                <li>
                                    <IconeCheck />
                                    <span>Material educativo em PDF</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Dicas de prevenção</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Orientação para buscar ajuda</span>
                                </li>
                            </ul>

                            <div className="divisorCard"></div>

                            <a
                                href="/doc/Guia_Completo_Apoio_Vitimas_Bullying.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button type="button">
                                    Acessar
                                    <span className="setaCard">→</span>
                                </button>
                            </a>
                        </div>

                        <div className="contanner3">
                            <span className="categoriaCard">
                                INFORMATIVO
                            </span>

                            <div id="saiba">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="rgb(12, 36, 102)"
                                        d="M224 224C224 171 267 128 320 128C373 128 416 171 416 224C416 266.7 388.1 302.9 349.5 315.4C321.1 324.6 288 350.7 288 392L288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416L352 392C352 390.3 352.6 387.9 355.5 384.7C358.5 381.4 363.4 378.2 369.2 376.3C433.5 355.6 480 295.3 480 224C480 135.6 408.4 64 320 64C231.6 64 160 135.6 160 224C160 241.7 174.3 256 192 256C209.7 256 224 241.7 224 224zM320 576C342.1 576 360 558.1 360 536C360 513.9 342.1 496 320 496C297.9 496 280 513.9 280 536C280 558.1 297.9 576 320 576z"
                                    />
                                </svg>

                                <h2>Saiba identificar</h2>
                            </div>

                            <p>
                                Aprenda a reconhecer os principais sinais e tipos de bullying.
                            </p>

                            <ul className="listaCard">
                                <li>
                                    <IconeCheck />
                                    <span>Bullying verbal</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Bullying físico</span>
                                </li>

                                <li>
                                    <IconeCheck />
                                    <span>Cyberbullying</span>
                                </li>
                            </ul>

                            <div className="divisorCard"></div>

                            <a
                                href="/doc/Saiba_Identificar_e_Combater_o_Bullying.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button type="button">
                                    Acessar
                                    <span className="setaCard">→</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}

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

            {/* Modal denúncia */}

            <div
                className={`modal ${modalAberto ? "ativo" : ""}`}
                id="modal"
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        fecharFormulario();
                    }
                }}
            >
                <div className="janelaFormulario">
                    <button
                        type="button"
                        className="fechar"
                        id="fecharFormulario"
                        onClick={fecharFormulario}
                    >
                        ✕
                    </button>

                    <h2>Denúncia Anônima</h2>

                    <form id="formDenuncia" onSubmit={enviarDenuncia}>
                        <div className="campo">
                            <label htmlFor="usuarioAnonimo">
                                Usuário
                            </label>

                            <input
                                type="text"
                                id="usuarioAnonimo"
                                name="usuarioAnonimo"
                                placeholder="Crie um nome de usuário"
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="localOcorrencia">
                                Onde ocorreu?
                            </label>

                            <select
                                id="localOcorrencia"
                                name="localOcorrencia"
                                required
                            >
                                <option value="Sala">Sala</option>
                                <option value="Pátio">Pátio</option>
                                <option value="Corredor">Corredor</option>
                                <option value="Banheiro">Banheiro</option>
                                <option value="Internet">Internet</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="agressorDescricao">
                                Quem praticou?
                            </label>

                            <textarea
                                id="agressorDescricao"
                                name="agressorDescricao"
                                rows={3}
                                maxLength={500}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="tipoBullying">
                                Tipo de Bullying
                            </label>

                            <select
                                id="tipoBullying"
                                name="tipoBullying"
                                required
                            >
                                <option value="Verbal">Verbal</option>
                                <option value="Físico">Físico</option>
                                <option value="Psicológico">Psicológico</option>
                                <option value="Social">Social</option>
                                <option value="Cyberbullying">
                                    Cyberbullying
                                </option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="relato">
                                Relato
                            </label>

                            <textarea
                                id="relato"
                                name="relato"
                                rows={6}
                                maxLength={2000}
                                required
                            />
                        </div>

                        <button
                            className="btnEnviar"
                            type="submit"
                            disabled={enviando}
                        >
                            {enviando ? "Enviando..." : "Enviar Denúncia"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal protocolo */}

            <div
                className={`modal ${modalProtocoloAberto ? "ativo" : ""}`}
                id="modalProtocolo"
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        fecharProtocolo();
                    }
                }}
            >
                <div className="janelaProtocolo">
                    <button
                        type="button"
                        className="fechar"
                        id="fecharProtocolo"
                        onClick={fecharProtocolo}
                    >
                        ✕
                    </button>

                    <div className="iconeSucesso">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M530.8 171.5C540.2 180.9 540.2 196.1 530.8 205.4L274.8 461.4C265.4 470.8 250.2 470.8 240.9 461.4L109.2 329.7C99.8 320.3 99.8 305.1 109.2 295.8C118.6 286.4 133.8 286.4 143.1 295.8L257.8 410.5L496.9 171.5C506.2 162.2 521.4 162.2 530.8 171.5Z"
                            />
                        </svg>
                    </div>

                    <h2>Denúncia enviada!</h2>

                    <p>
                        Sua denúncia foi registrada com sucesso.
                    </p>

                    <p className="tituloProtocolo">
                        Seu número de protocolo é:
                    </p>

                    <strong id="codigoProtocolo">
                        {codigoProtocolo}
                    </strong>

                    <p className="avisoProtocolo">
                        Guarde este código para futuras consultas.
                    </p>

                    <button
                        type="button"
                        className="btnProtocolo"
                        id="confirmarProtocolo"
                        onClick={fecharProtocolo}
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </>
    );
}

export default Servicos;