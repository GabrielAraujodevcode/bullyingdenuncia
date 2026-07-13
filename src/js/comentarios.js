const abrirComentario = document.getElementById("abrirComentario");
const fecharComentario = document.getElementById("fecharComentario");
const modalComentario = document.getElementById("modalComentario");

const formComentario = document.getElementById("formComentario");
const nomeUsuario = document.getElementById("nomeUsuario");
const textoComentario = document.getElementById("textoComentario");

const quantidadeCaracteres = document.getElementById(
    "quantidadeCaracteres"
);

const caixasComentarios = document.querySelectorAll(
    ".comentario1, .comentario2, .comentario3, .comentario4"
);

const chaveLocalStorage = "comentariosEstudantes";


/* ==========================
ABRIR JANELA
========================== */

abrirComentario.addEventListener("click", () => {

    modalComentario.classList.add("ativo");

    nomeUsuario.focus();

});


/* ==========================
FECHAR JANELA
========================== */

function encerrarJanelaComentario(){

    modalComentario.classList.remove("ativo");

    formComentario.reset();

    quantidadeCaracteres.textContent = "0";

}


fecharComentario.addEventListener(
    "click",
    encerrarJanelaComentario
);


modalComentario.addEventListener("click", (evento) => {

    if(evento.target === modalComentario){

        encerrarJanelaComentario();

    }

});


/* ==========================
CONTADOR DE CARACTERES
========================== */

textoComentario.addEventListener("input", () => {

    quantidadeCaracteres.textContent =
        textoComentario.value.length;

});


/* ==========================
COMENTÁRIOS INICIAIS
========================== */

function obterComentariosIniciais(){

    const comentariosIniciais = [];

    caixasComentarios.forEach((caixa) => {

        const usuario = caixa.querySelector("h3").textContent;
        const comentario = caixa.querySelector("p").textContent;

        comentariosIniciais.push({

            usuario: usuario.replace("@", "").replace(":", "").trim(),

            comentario: comentario.trim()

        });

    });

    return comentariosIniciais;

}


/* ==========================
CARREGAR COMENTÁRIOS
========================== */

function carregarComentarios(){

    const comentariosSalvos = localStorage.getItem(
        chaveLocalStorage
    );

    if(comentariosSalvos){

        return JSON.parse(comentariosSalvos);

    }

    const comentariosIniciais = obterComentariosIniciais();

    localStorage.setItem(
        chaveLocalStorage,
        JSON.stringify(comentariosIniciais)
    );

    return comentariosIniciais;

}


/* ==========================
SALVAR COMENTÁRIOS
========================== */

function salvarComentarios(comentarios){

    localStorage.setItem(
        chaveLocalStorage,
        JSON.stringify(comentarios)
    );

}


/* ==========================
MOSTRAR NA TELA
========================== */

function mostrarComentarios(){

    const comentarios = carregarComentarios();

    caixasComentarios.forEach((caixa, indice) => {

        const tituloUsuario = caixa.querySelector("h3");
        const paragrafoComentario = caixa.querySelector("p");

        const comentarioAtual = comentarios[indice];


        if(comentarioAtual){

            tituloUsuario.textContent =
                `@${comentarioAtual.usuario}:`;

            paragrafoComentario.textContent =
                comentarioAtual.comentario;

        }else{

            tituloUsuario.textContent = "@usuario:";

            paragrafoComentario.textContent =
                "Nenhum comentário ainda.";

        }

    });

}


/* ==========================
PUBLICAR COMENTÁRIO
========================== */

formComentario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const usuarioDigitado = nomeUsuario.value.trim();

    const comentarioDigitado = textoComentario.value.trim();


    if(usuarioDigitado === "" || comentarioDigitado === ""){

        alert("Preencha o nome de usuário e o comentário.");

        return;

    }


    if(comentarioDigitado.length > 60){

        alert("O comentário deve ter no máximo 60 caracteres.");

        return;

    }


    const comentarios = carregarComentarios();


    const novoComentario = {

        usuario: usuarioDigitado,

        comentario: comentarioDigitado

    };


    if(comentarios.length >= 4){

        comentarios.shift();

    }


    comentarios.push(novoComentario);


    salvarComentarios(comentarios);

    mostrarComentarios();

    encerrarJanelaComentario();

});


/* ==========================
INICIAR A PÁGINA
========================== */

mostrarComentarios();
/* ==========================
EDITAR E APAGAR COMENTÁRIOS
========================== */

const botaoEditar = document.getElementById("botaoEditar");
const modalEditar = document.getElementById("modalEditar");
const fecharEditar = document.getElementById("fecharEditar");

const listaEditarComentarios = document.getElementById(
    "listaEditarComentarios"
);


/*
Essa verificação permite utilizar o mesmo JavaScript
na página do estudante e na página da secretaria.
*/

if(
    botaoEditar &&
    modalEditar &&
    fecharEditar &&
    listaEditarComentarios
){

    function abrirJanelaEditar(){

        montarListaEdicao();

        modalEditar.classList.add("ativo");

    }


    function fecharJanelaEditar(){

        modalEditar.classList.remove("ativo");

    }


    function montarListaEdicao(){

        const comentarios = carregarComentarios();

        listaEditarComentarios.innerHTML = "";


        if(comentarios.length === 0){

            listaEditarComentarios.innerHTML = `
                <p class="semComentarios">
                    Nenhum comentário publicado.
                </p>
            `;

            return;

        }


        comentarios.forEach((comentario, indice) => {

            const itemComentario = document.createElement("div");

            itemComentario.classList.add(
                "itemEditarComentario"
            );


            const conteudoComentario =
                document.createElement("div");

            conteudoComentario.classList.add(
                "conteudoEditarComentario"
            );


            const tituloUsuario =
                document.createElement("h3");

            tituloUsuario.textContent =
                `@${comentario.usuario}:`;


            const textoDoComentario =
                document.createElement("p");

            textoDoComentario.textContent =
                comentario.comentario;


            const botaoApagar =
                document.createElement("button");

            botaoApagar.type = "button";

            botaoApagar.classList.add(
                "botaoApagarComentario"
            );

            botaoApagar.textContent = "Apagar";


            botaoApagar.addEventListener("click", () => {

                apagarComentario(indice);

            });


            conteudoComentario.append(
                tituloUsuario,
                textoDoComentario
            );


            itemComentario.append(
                conteudoComentario,
                botaoApagar
            );


            listaEditarComentarios.appendChild(
                itemComentario
            );

        });

    }


    function apagarComentario(indice){

        const comentarios = carregarComentarios();

        comentarios.splice(indice, 1);

        salvarComentarios(comentarios);

        mostrarComentarios();

        montarListaEdicao();

    }


    botaoEditar.addEventListener(
        "click",
        abrirJanelaEditar
    );


    fecharEditar.addEventListener(
        "click",
        fecharJanelaEditar
    );


    modalEditar.addEventListener("click", (evento) => {

        if(evento.target === modalEditar){

            fecharJanelaEditar();

        }

    });

}
/* ==========================
SISTEMA DE NOTÍCIAS
========================== */

const abrirNoticia = document.getElementById("abrirNoticia");
const fecharNoticia = document.getElementById("fecharNoticia");
const modalNoticia = document.getElementById("modalNoticia");

const formNoticia = document.getElementById("formNoticia");
const textoNoticia = document.getElementById("textoNoticia");

const quantidadeNoticia = document.getElementById(
    "quantidadeNoticia"
);

const editarNoticias = document.getElementById("editarNoticias");

const modalEditarNoticias = document.getElementById(
    "modalEditarNoticias"
);

const fecharEditarNoticias = document.getElementById(
    "fecharEditarNoticias"
);

const listaEditarNoticias = document.getElementById(
    "listaEditarNoticias"
);

const caixasNoticias = document.querySelectorAll(
    ".noticia1, .noticia2"
);

const chaveNoticias = "noticiasSecretaria";


/* ==========================
CARREGAR NOTÍCIAS
========================== */

function carregarNoticias(){

    const noticiasSalvas = localStorage.getItem(
        chaveNoticias
    );

    if(noticiasSalvas){

        try{

            return JSON.parse(noticiasSalvas);

        }catch(erro){

            return [];

        }

    }

    const noticiasIniciais = [];

    caixasNoticias.forEach((caixa) => {

        const paragrafo = caixa.querySelector("p");

        if(paragrafo){

            const texto = paragrafo.textContent.trim();

            if(
                texto !== "" &&
                texto !== "Nenhuma notícia publicada."
            ){

                noticiasIniciais.push(texto);

            }

        }

    });

    localStorage.setItem(
        chaveNoticias,
        JSON.stringify(noticiasIniciais)
    );

    return noticiasIniciais;

}


/* ==========================
SALVAR NOTÍCIAS
========================== */

function salvarNoticias(noticias){

    localStorage.setItem(
        chaveNoticias,
        JSON.stringify(noticias)
    );

}


/* ==========================
MOSTRAR NOTÍCIAS
========================== */

function mostrarNoticias(){

    const noticias = carregarNoticias();

    caixasNoticias.forEach((caixa, indice) => {

        const paragrafo = caixa.querySelector("p");

        if(!paragrafo){

            return;

        }

        if(noticias[indice]){

            paragrafo.textContent = noticias[indice];

        }else{

            paragrafo.textContent =
                "Nenhuma notícia publicada.";

        }

    });

}


/* ==========================
ABRIR E FECHAR PUBLICAÇÃO
========================== */

if(
    abrirNoticia &&
    fecharNoticia &&
    modalNoticia &&
    formNoticia &&
    textoNoticia
){

    abrirNoticia.addEventListener("click", () => {

        modalNoticia.classList.add("ativo");

        textoNoticia.focus();

    });


    function encerrarJanelaNoticia(){

        modalNoticia.classList.remove("ativo");

        formNoticia.reset();

        if(quantidadeNoticia){

            quantidadeNoticia.textContent = "0";

        }

    }


    fecharNoticia.addEventListener(
        "click",
        encerrarJanelaNoticia
    );


    modalNoticia.addEventListener("click", (evento) => {

        if(evento.target === modalNoticia){

            encerrarJanelaNoticia();

        }

    });


    textoNoticia.addEventListener("input", () => {

        if(quantidadeNoticia){

            quantidadeNoticia.textContent =
                textoNoticia.value.length;

        }

    });


    formNoticia.addEventListener("submit", (evento) => {

        evento.preventDefault();

        const novaNoticia = textoNoticia.value.trim();


        if(novaNoticia === ""){

            alert("Digite uma notícia antes de publicar.");

            return;

        }


        if(novaNoticia.length > 120){

            alert(
                "A notícia deve ter no máximo 120 caracteres."
            );

            return;

        }


        const noticias = carregarNoticias();


        if(noticias.length >= 2){

            noticias.shift();

        }


        noticias.push(novaNoticia);

        salvarNoticias(noticias);

        mostrarNoticias();

        encerrarJanelaNoticia();

    });

}


/* ==========================
EDITAR E APAGAR NOTÍCIAS
========================== */

if(
    editarNoticias &&
    modalEditarNoticias &&
    fecharEditarNoticias &&
    listaEditarNoticias
){

    function montarListaNoticias(){

        const noticias = carregarNoticias();

        listaEditarNoticias.innerHTML = "";


        if(noticias.length === 0){

            listaEditarNoticias.innerHTML = `
                <p class="semNoticias">
                    Nenhuma notícia publicada.
                </p>
            `;

            return;

        }


        noticias.forEach((noticia, indice) => {

            const item = document.createElement("div");

            item.classList.add("itemEditarNoticia");


            const texto = document.createElement("p");

            texto.classList.add("textoEditarNoticia");

            texto.textContent = noticia;


            const botaoApagar = document.createElement("button");

            botaoApagar.type = "button";

            botaoApagar.classList.add(
                "botaoApagarNoticia"
            );

            botaoApagar.textContent = "Apagar";


            botaoApagar.addEventListener("click", () => {

                apagarNoticia(indice);

            });


            item.append(texto, botaoApagar);

            listaEditarNoticias.appendChild(item);

        });

    }


    function apagarNoticia(indice){

        const noticias = carregarNoticias();

        noticias.splice(indice, 1);

        salvarNoticias(noticias);

        mostrarNoticias();

        montarListaNoticias();

    }


    editarNoticias.addEventListener("click", () => {

        montarListaNoticias();

        modalEditarNoticias.classList.add("ativo");

    });


    fecharEditarNoticias.addEventListener("click", () => {

        modalEditarNoticias.classList.remove("ativo");

    });


    modalEditarNoticias.addEventListener(
        "click",
        (evento) => {

            if(evento.target === modalEditarNoticias){

                modalEditarNoticias.classList.remove(
                    "ativo"
                );

            }

        }
    );

}


/* ==========================
ATUALIZAÇÃO ENTRE ABAS
========================== */

window.addEventListener("storage", (evento) => {

    if(evento.key === chaveNoticias){

        mostrarNoticias();

        if(
            modalEditarNoticias &&
            modalEditarNoticias.classList.contains("ativo")
        ){

            montarListaNoticias();

        }

    }

});


/* ==========================
INICIAR AS NOTÍCIAS
========================== */

mostrarNoticias();