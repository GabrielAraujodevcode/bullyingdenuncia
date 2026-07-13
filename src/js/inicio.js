const abrir = document.getElementById("abrirFormulario");
const fechar = document.getElementById("fecharFormulario");
const modal = document.getElementById("modal");

const formulario = document.getElementById("formDenuncia");

const modalProtocolo = document.getElementById("modalProtocolo");
const fecharProtocolo = document.getElementById("fecharProtocolo");
const confirmarProtocolo = document.getElementById("confirmarProtocolo");
const codigoProtocolo = document.getElementById("codigoProtocolo");


abrir.addEventListener("click", () => {

    modal.classList.add("ativo");

});


fechar.addEventListener("click", () => {

    modal.classList.remove("ativo");

});


modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.classList.remove("ativo");

    }

});


function gerarProtocolo(){

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let primeiraParte = "";
    let segundaParte = "";
    let terceiraParte = "";

    for(let i = 0; i < 4; i++){

        primeiraParte += caracteres[
            Math.floor(Math.random() * caracteres.length)
        ];

        segundaParte += caracteres[
            Math.floor(Math.random() * caracteres.length)
        ];

        terceiraParte += caracteres[
            Math.floor(Math.random() * caracteres.length)
        ];

    }

    return `DEN-${primeiraParte}-${segundaParte}-${terceiraParte}`;

}


formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const novoProtocolo = gerarProtocolo();

    codigoProtocolo.textContent = novoProtocolo;

    modal.classList.remove("ativo");

    modalProtocolo.classList.add("ativo");

    formulario.reset();

});


function encerrarProtocolo(){

    modalProtocolo.classList.remove("ativo");

}


fecharProtocolo.addEventListener("click", encerrarProtocolo);

confirmarProtocolo.addEventListener("click", encerrarProtocolo);


modalProtocolo.addEventListener("click", (e) => {

    if(e.target === modalProtocolo){

        encerrarProtocolo();

    }

});