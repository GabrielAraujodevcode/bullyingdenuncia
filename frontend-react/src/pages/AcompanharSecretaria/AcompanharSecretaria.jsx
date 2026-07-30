import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../services/api";

import "./acompanhar-secretaria.css";

function formatarStatus(statusBanco) {
    const status = statusBanco?.trim().toLowerCase();

    if (
        status === "recebida" ||
        status === "em_analise" ||
        status === "em análise"
    ) {
        return "Em análise";
    }

    if (
        status === "em_andamento" ||
        status === "em andamento" ||
        status === "em_acompanhamento" ||
        status === "em acompanhamento"
    ) {
        return "Em andamento";
    }

    if (
        status === "concluida" ||
        status === "concluída" ||
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

    return "statusAnalise";
}

function AcompanharSecretaria() {
    const navigate = useNavigate();

    const [denuncias, setDenuncias] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);
    const [statusSelecionado, setStatusSelecionado] = useState("Em análise");
    const [mensagemSecretaria, setMensagemSecretaria] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("tokenAdministrador");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        carregarDenuncias();
    }, [navigate]);

    async function carregarDenuncias() {
        try {
            setCarregando(true);
            setErro("");

            const resultado = await api.listarDenuncias();

            setDenuncias(resultado.denuncias ?? []);
        } catch (erroCarregamento) {
            console.error(erroCarregamento);

            setErro(
                erroCarregamento.message ||
                "Não foi possível carregar as denúncias."
            );

            setDenuncias([]);
        } finally {
            setCarregando(false);
        }
    }

    function sair() {
        localStorage.removeItem("tokenAdministrador");
        localStorage.removeItem("administrador");
        navigate("/login", { replace: true });
    }

    async function abrirDenuncia(protocolo) {
        try {
            setModalAberto(true);
            setDenunciaSelecionada(null);
            setMensagemSecretaria("");

            const resultado = await api.buscarDenunciaPorProtocolo(protocolo);
            const denuncia = resultado.denuncia;

            setDenunciaSelecionada(denuncia);
            setStatusSelecionado(formatarStatus(denuncia.status));
            setMensagemSecretaria(denuncia.mensagem_secretaria || "");
        } catch (erroAbertura) {
            console.error(erroAbertura);
            setModalAberto(false);

            alert(
                erroAbertura.message ||
                "Não foi possível carregar essa denúncia."
            );
        }
    }

    function fecharModal() {
        if (salvando || excluindo) return;

        setModalAberto(false);
        setDenunciaSelecionada(null);
        setMensagemSecretaria("");
    }

    async function salvarAtualizacao(evento) {
        evento.preventDefault();

        if (!denunciaSelecionada) {
            return;
        }

        const mensagem = mensagemSecretaria.trim();

        if (!mensagem) {
            alert("Digite uma mensagem para o estudante.");
            return;
        }

        try {
            setSalvando(true);

            await api.atualizarDenuncia(denunciaSelecionada.id, {
                status: statusSelecionado,
                mensagem
            });

            setModalAberto(false);
            setDenunciaSelecionada(null);
            setMensagemSecretaria("");

            await carregarDenuncias();

            alert("Denúncia atualizada com sucesso!");
        } catch (erroAtualizacao) {
            console.error(erroAtualizacao);

            alert(
                erroAtualizacao.message ||
                "Não foi possível atualizar a denúncia."
            );
        } finally {
            setSalvando(false);
        }
    }

    async function excluirDenuncia() {
        if (!denunciaSelecionada) {
            return;
        }

        const confirmou = confirm(
            `Deseja realmente excluir a denúncia ${denunciaSelecionada.protocolo}?`
        );

        if (!confirmou) {
            return;
        }

        try {
            setExcluindo(true);

            await api.excluirDenuncia(denunciaSelecionada.id);

            setModalAberto(false);
            setDenunciaSelecionada(null);
            setMensagemSecretaria("");

            await carregarDenuncias();

            alert("Denúncia excluída com sucesso!");
        } catch (erroExclusao) {
            console.error(erroExclusao);

            alert(
                erroExclusao.message ||
                "Não foi possível excluir a denúncia."
            );
        } finally {
            setExcluindo(false);
        }
    }

    return (
        <>
            <header>
                <Link
                    to="/secretaria"
                    className="voltarPagina"
                    aria-label="Voltar para a área da secretaria"
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

                <button
                    type="button"
                    className="botaoSair"
                    onClick={sair}
                >
                    Sair
                </button>

                <div className="title">
                    <span className="etiquetaHeader">
                        Gestão de ocorrências
                    </span>

                    <div className="iconeHeader">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path
                                fill="currentColor"
                                d="M96 96C78.3 96 64 110.3 64 128V512C64 529.7 78.3 544 96 544H544C561.7 544 576 529.7 576 512V128C576 110.3 561.7 96 544 96H96ZM160 176H480V240H160V176ZM160 288H480V352H160V288ZM160 400H352V464H160V400Z"
                            />
                        </svg>
                    </div>

                    <h1>Acompanhe denúncias</h1>

                    <p className="descricaoHeader">
                        Consulte os protocolos recebidos, analise os relatos,
                        atualize o andamento e envie orientações aos estudantes.
                    </p>

                    <div className="recursosHeader">
                        <span>Protocolos registrados</span>
                        <span>Atualização de status</span>
                        <span>Mensagem ao estudante</span>
                    </div>
                </div>
            </header>

            <main>
                <section className="areaDenuncias">
                    <div className="containerTabela">
                        <div className="cabecalhoTabela">
                            <div>
                                <span className="categoriaSecao">
                                    Painel administrativo
                                </span>

                                <h2>Denúncias registradas</h2>

                                <p>
                                    Selecione uma ocorrência para visualizar os
                                    detalhes e realizar o acompanhamento.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="botaoAtualizarLista"
                                onClick={carregarDenuncias}
                                disabled={carregando}
                            >
                                {carregando ? "Atualizando..." : "Atualizar lista"}
                            </button>
                        </div>

                        {erro && (
                            <div className="mensagemErroTabela">
                                <p>{erro}</p>

                                <button
                                    type="button"
                                    onClick={carregarDenuncias}
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        )}

                        <div className="tabelaResponsiva">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Protocolo</th>
                                        <th>Status</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>

                                <tbody id="listaDenuncias">
                                    {carregando ? (
                                        <tr>
                                            <td colSpan={3}>
                                                Carregando denúncias...
                                            </td>
                                        </tr>
                                    ) : denuncias.length === 0 ? (
                                        <tr>
                                            <td colSpan={3}>
                                                Nenhuma denúncia registrada.
                                            </td>
                                        </tr>
                                    ) : (
                                        denuncias.map((denuncia) => {
                                            const status = formatarStatus(
                                                denuncia.status
                                            );

                                            return (
                                                <tr key={denuncia.id}>
                                                    <td>
                                                        <strong>
                                                            {denuncia.protocolo}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`statusTabela ${obterClasseStatus(
                                                                status
                                                            )}`}
                                                        >
                                                            {status}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="botaoAveriguar"
                                                            onClick={() =>
                                                                abrirDenuncia(
                                                                    denuncia.protocolo
                                                                )
                                                            }
                                                        >
                                                            Averiguar
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
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

            <div
                className={`modal ${modalAberto ? "ativo" : ""}`}
                id="modalAveriguar"
                onMouseDown={(evento) => {
                    if (evento.target === evento.currentTarget) {
                        fecharModal();
                    }
                }}
            >
                <div className="janelaFormulario janelaAveriguar">
                    <button
                        type="button"
                        className="fechar"
                        onClick={fecharModal}
                        disabled={salvando || excluindo}
                    >
                        ✕
                    </button>

                    <h2>Averiguar denúncia</h2>

                    {!denunciaSelecionada ? (
                        <p className="carregandoDenuncia">
                            Carregando informações...
                        </p>
                    ) : (
                        <form onSubmit={salvarAtualizacao}>
                            <div className="dadosDenuncia">
                                <div className="campoDetalhe destaqueProtocolo">
                                    <span>Protocolo</span>
                                    <strong>
                                        {denunciaSelecionada.protocolo}
                                    </strong>
                                </div>

                                <div className="campoDetalhe">
                                    <span>Usuário</span>
                                    <p>
                                        {denunciaSelecionada.usuario_anonimo ||
                                            denunciaSelecionada.usuarioAnonimo ||
                                            "Não informado"}
                                    </p>
                                </div>

                                <div className="campoDetalhe">
                                    <span>Local da ocorrência</span>
                                    <p>
                                        {denunciaSelecionada.local_ocorrencia ||
                                            denunciaSelecionada.localOcorrencia ||
                                            "Não informado"}
                                    </p>
                                </div>

                                <div className="campoDetalhe">
                                    <span>Quem praticou</span>
                                    <p>
                                        {denunciaSelecionada.agressor_descricao ||
                                            denunciaSelecionada.agressorDescricao ||
                                            "Não informado"}
                                    </p>
                                </div>

                                <div className="campoDetalhe">
                                    <span>Tipo de bullying</span>
                                    <p>
                                        {denunciaSelecionada.tipo_bullying ||
                                            denunciaSelecionada.tipoBullying ||
                                            "Não informado"}
                                    </p>
                                </div>

                                <div className="campoDetalhe campoRelato">
                                    <span>Relato</span>
                                    <p>
                                        {denunciaSelecionada.relato ||
                                            "Não informado"}
                                    </p>
                                </div>
                            </div>

                            <div className="campo">
                                <label htmlFor="statusDenuncia">
                                    Atualizar status
                                </label>

                                <select
                                    id="statusDenuncia"
                                    value={statusSelecionado}
                                    onChange={(evento) =>
                                        setStatusSelecionado(
                                            evento.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="Em análise">
                                        Em análise
                                    </option>

                                    <option value="Em andamento">
                                        Em andamento
                                    </option>

                                    <option value="Concluída">
                                        Concluída
                                    </option>
                                </select>
                            </div>

                            <div className="campo">
                                <label htmlFor="mensagemSecretaria">
                                    Mensagem para o estudante
                                </label>

                                <textarea
                                    id="mensagemSecretaria"
                                    rows={5}
                                    maxLength={300}
                                    placeholder="Digite uma orientação ou atualização para o estudante."
                                    value={mensagemSecretaria}
                                    onChange={(evento) =>
                                        setMensagemSecretaria(
                                            evento.target.value
                                        )
                                    }
                                    required
                                />

                                <div className="contadorMensagem">
                                    {mensagemSecretaria.length}/300
                                </div>
                            </div>

                            <div className="acoesModal">
                                <button
                                    type="button"
                                    className="botaoExcluir"
                                    onClick={excluirDenuncia}
                                    disabled={salvando || excluindo}
                                >
                                    {excluindo
                                        ? "Excluindo..."
                                        : "Excluir denúncia"}
                                </button>

                                <button
                                    type="submit"
                                    className="botaoAtualizar"
                                    disabled={salvando || excluindo}
                                >
                                    {salvando
                                        ? "Salvando..."
                                        : "Salvar atualização"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default AcompanharSecretaria;