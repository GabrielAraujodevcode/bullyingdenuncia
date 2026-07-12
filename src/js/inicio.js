const abrir = document.getElementById("abrirFormulario");
const fechar = document.getElementById("fecharFormulario");
const modal = document.getElementById("modal");

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