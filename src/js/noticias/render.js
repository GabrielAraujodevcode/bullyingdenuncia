/* ==========================
EXIBIÇÃO DAS NOTÍCIAS
========================== */

window.NoticiasRender = {

    caixas: document.querySelectorAll(
        ".noticia1, .noticia2"
    ),


    obterNoticiasIniciais(){

        const noticiasIniciais = [];

        this.caixas.forEach((caixa) => {

            const paragrafo = caixa.querySelector("p");

            if(!paragrafo){

                return;

            }

            const texto = paragrafo.textContent.trim();


            if(
                texto !== "" &&
                texto !== "Nenhuma notícia publicada."
            ){

                noticiasIniciais.push(texto);

            }

        });

        return noticiasIniciais;

    },


    carregarNoticias(){

        let noticias =
            window.NoticiasStorage.carregar();


        if(noticias === null){

            noticias = this.obterNoticiasIniciais();

            window.NoticiasStorage.salvar(
                noticias
            );

        }

        return noticias;

    },


    mostrar(){

        const noticias =
            this.carregarNoticias();


        this.caixas.forEach((caixa, indice) => {

            const paragrafo = caixa.querySelector("p");

            if(!paragrafo){

                return;

            }


            if(noticias[indice]){

                paragrafo.textContent =
                    noticias[indice];

            }else{

                paragrafo.textContent =
                    "Nenhuma notícia publicada.";

            }

        });

    }

};


/* ==========================
INICIAR NOTÍCIAS
========================== */

window.NoticiasRender.mostrar();


/* ==========================
ATUALIZAR ENTRE ABAS
========================== */

window.addEventListener("storage", (evento) => {

    if(
        evento.key ===
        window.NoticiasStorage.chave
    ){

        window.NoticiasRender.mostrar();

    }

});