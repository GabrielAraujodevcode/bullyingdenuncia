import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../services/api";

import "./acompanhar-estudante.css";

function normalizarStatus(statusBanco) {
    const status = statusBanco?.trim().toLowerCase();

    if (
        status === "recebida" ||
        status === "em análise" ||
        status === "em_analise"
    ) {
        return "Em análise";
    }

    if (
        status === "em andamento" ||
        status === "em_andamento" ||
        status === "em acompanhamento" ||
        status === "em_acompanhamento"
    ) {
        return "Em andamento";
    }

    if (
        status === "concluída" ||
        status === "concluida" ||
        status === "resolvida"
    ) {
        return "Concluída";
    }

    return "Em análise";
}

function obterClasseStatus(status) {
    if (status === "Em andamento") {
        return "statusAndamento";
    }

    if (status === "Concluída") {
        return "statusConcluida";
    }

    if (status === "Indisponível") {
        return "";
    }

    return "statusAnalise";
}

function obterEtapasAtivas(status) {
    if (status === "Concluída") {
        return 3;
    }

    if (status === "Em andamento") {
        return 2;
    }

    if (status === "Em análise") {
        return 1;
    }

    return 0;
}

function AcompanharEstudante() {
    const [protocolo, setProtocolo] = useState(
        sessionStorage.getItem("protocoloConsulta") || ""
    );
    const [status, setStatus] = useState("Carregando...");
    const [mensagem, setMensagem] = useState(
        "Consultando as informações da denúncia."
    );

    useEffect(() => {
        carregarDenuncia();
    }, []);

    async function carregarDenuncia() {
        const protocoloSalvo =
            sessionStorage.getItem("protocoloConsulta");

        if (!protocoloSalvo) {
            mostrarErro("Nenhum protocolo foi informado.");
            return;
        }

        try {
            setProtocolo(protocoloSalvo);
            setStatus("Carregando...");
            setMensagem("Consultando as informações da denúncia.");

            const resultado =
                await api.buscarDenunciaPorProtocolo(protocoloSalvo);

            const denuncia = resultado.denuncia;
            const statusFormatado = normalizarStatus(denuncia.status);

            setProtocolo(denuncia.protocolo);
            setStatus(statusFormatado);
            setMensagem(
                denuncia.mensagem_secretaria ||
                "Ainda não existe uma mensagem da secretaria."
            );
        } catch (erro) {
            console.error(erro);

            mostrarErro(
                erro.message ||
                "Não foi possível localizar a denúncia."
            );
        }
    }

    function mostrarErro(textoErro) {
        setProtocolo("Protocolo não encontrado");
        setStatus("Indisponível");
        setMensagem(textoErro);
    }

    const etapasAtivas = obterEtapasAtivas(status);
    const classeStatus = obterClasseStatus(status);

    return (
        <>
            <header>
                <Link
                    to="/estudante"
                    className="voltarPagina"
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

                    <span>Voltar</span>
                </Link>

                <div className="title">
                    <span className="etiquetaHeader">
                        Acompanhamento
                    </span>

                    <div className="iconeHeader">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path
                                fill="currentColor"
                                d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64Z"
                            />
                        </svg>
                    </div>

                    <h1>Acompanhe sua denúncia</h1>

                    <p className="descricaoHeader">
                        Utilize seu protocolo para acompanhar o andamento da denúncia
                        e visualizar as mensagens enviadas pela equipe responsável.
                    </p>

                    <div className="recursosHeader">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M96 96H544V544H96V96Z"
                                />
                            </svg>

                            Protocolo seguro
                        </span>

                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M320 64L512 144V288C512 411 435 518 320 576C205 518 128 411 128 288V144L320 64Z"
                                />
                            </svg>

                            Acompanhamento online
                        </span>

                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                            >
                                <path
                                    fill="currentColor"
                                    d="M96 96C78 96 64 110 64 128V448C64 466 78 480 96 480H192V560L298 480H544C562 480 576 466 576 448V128C576 110 562 96 544 96H96Z"
                                />
                            </svg>

                            Comunicação com a secretaria
                        </span>
                    </div>
                </div>
            </header>

            <main>
                <section className="areaAcompanhamento">
                    <div className="containerAcompanhamento">
                        <h2>Detalhes da denúncia</h2>

                        <div className="grupoProtocolo cardInformacao">
                            <span className="tituloInformacao">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M128 64H448L544 160V544C544 562 530 576 512 576H128C110 576 96 562 96 544V96C96 78 110 64 128 64Z"
                                    />
                                </svg>

                                Código da denúncia
                            </span>

                            <strong id="protocoloEstudante">
                                {protocolo || "DEN-0000-0000-0000"}
                            </strong>
                        </div>

                        <div className="grupoStatus cardInformacao">
                            <span className="tituloInformacao">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M530.8 171.5C540.2 180.9 540.2 196.1 530.8 205.4L274.8 461.4C265.4 470.8 250.2 470.8 240.9 461.4L109.2 329.7C99.8 320.3 99.8 305.1 109.2 295.8C118.6 286.4 133.8 286.4 143.1 295.8L257.8 410.5L496.9 171.5C506.2 162.2 521.4 162.2 530.8 171.5Z"
                                    />
                                </svg>

                                Status atual
                            </span>

                            <div
                                className={`statusDenuncia ${classeStatus}`}
                                id="statusEstudante"
                            >
                                {status}
                            </div>
                        </div>

                        <div className="etapasStatus">
                            <div
                                className={`etapa ${
                                    etapasAtivas >= 1 ? "ativa" : ""
                                }`}
                                data-status="Em análise"
                            >
                                <span>1</span>
                                <p>Em análise</p>
                            </div>

                            <div
                                className={`linhaEtapa ${
                                    etapasAtivas >= 2 ? "ativa" : ""
                                }`}
                                id="linhaEtapa1"
                            ></div>

                            <div
                                className={`etapa ${
                                    etapasAtivas >= 2 ? "ativa" : ""
                                }`}
                                data-status="Em andamento"
                            >
                                <span>2</span>
                                <p>Em andamento</p>
                            </div>

                            <div
                                className={`linhaEtapa ${
                                    etapasAtivas >= 3 ? "ativa" : ""
                                }`}
                                id="linhaEtapa2"
                            ></div>

                            <div
                                className={`etapa ${
                                    etapasAtivas >= 3 ? "ativa" : ""
                                }`}
                                data-status="Concluída"
                            >
                                <span>3</span>
                                <p>Concluída</p>
                            </div>
                        </div>

                        <div className="grupoMensagem cardInformacao">
                            <h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M96 96C78 96 64 110 64 128V448C64 466 78 480 96 480H192V560L298 480H544C562 480 576 466 576 448V128C576 110 562 96 544 96H96Z"
                                    />
                                </svg>

                                Mensagem da secretaria
                            </h3>

                            <div className="mensagemSecretaria">
                                <p id="mensagemEstudante">
                                    {mensagem}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AcompanharEstudante;