/* ==========================
PROTEGER PÁGINAS ADMINISTRATIVAS
========================== */

(function protegerPagina() {

    const tokenAdministrador =
        localStorage.getItem(
            "tokenAdministrador"
        );

    if (!tokenAdministrador) {

        window.location.replace(
            "login.html"
        );
    }

})();