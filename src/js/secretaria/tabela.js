/* ==========================
TABELA DE DENÚNCIAS
========================== */

window.DenunciaSecretariaTabela = {

    formatarStatus(statusBanco) {

        const status = statusBanco
            ?.trim()
            .toLowerCase();

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
            status === "em_acompanhamento"
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
    },

    obterClasseStatus(status) {

        if (status === "Em andamento") {
            return "statusAndamento";
        }

        if (status === "Concluída") {
            return "statusConcluida";
        }

        return "statusAnalise";
    },

    async montar() {

        const elementos =
            window.DenunciaSecretariaElementos;

        elementos.lista.innerHTML = "";

        try {

            const denuncias =
                await window.Api.listarDenuncias();

            if (denuncias.length === 0) {

                const linha =
                    document.createElement("tr");

                const coluna =
                    document.createElement("td");

                coluna.colSpan = 3;

                coluna.textContent =
                    "Nenhuma denúncia registrada.";

                coluna.style.textAlign = "center";

                linha.appendChild(coluna);

                elementos.lista.appendChild(linha);

                return;
            }

            denuncias.forEach((denuncia) => {

                const linha =
                    document.createElement("tr");

                /* ======================
                   PROTOCOLO
                ====================== */

                const colunaProtocolo =
                    document.createElement("td");

                colunaProtocolo.textContent =
                    denuncia.protocolo;

                /* ======================
                   STATUS
                ====================== */

                const statusFormatado =
                    this.formatarStatus(
                        denuncia.status
                    );

                const colunaStatus =
                    document.createElement("td");

                const status =
                    document.createElement("span");

                status.classList.add(
                    "statusTabela",
                    this.obterClasseStatus(
                        statusFormatado
                    )
                );

                status.textContent =
                    statusFormatado;

                colunaStatus.appendChild(status);

                /* ======================
                   BOTÃO
                ====================== */

                const colunaAcao =
                    document.createElement("td");

                const botao =
                    document.createElement("button");

                botao.type = "button";

                botao.classList.add(
                    "botaoAveriguar"
                );

                botao.textContent =
                    "Averiguar";

                botao.addEventListener(
                    "click",
                    () => {

                        window
                            .DenunciaSecretariaModal
                            .abrir(
                                denuncia.protocolo
                            );
                    }
                );

                colunaAcao.appendChild(botao);

                linha.append(
                    colunaProtocolo,
                    colunaStatus,
                    colunaAcao
                );

                elementos.lista.appendChild(
                    linha
                );
            });

        } catch (erro) {

            console.error(erro);

            elementos.lista.innerHTML = `
                <tr>
                    <td
                        colspan="3"
                        style="text-align:center;color:red;"
                    >
                        Erro ao carregar denúncias.
                    </td>
                </tr>
            `;
        }
    }
};