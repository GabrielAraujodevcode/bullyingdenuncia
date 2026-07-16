const TOKEN_KEY = "tokenAdministrador";

window.Auth = {

    obterToken() {
        return localStorage.getItem(
            TOKEN_KEY
        );
    },

    estaLogado() {
        return Boolean(
            this.obterToken()
        );
    },

    sair() {
        localStorage.removeItem(
            TOKEN_KEY
        );

        localStorage.removeItem(
            "administrador"
        );

        window.location.replace(
            "index.html"
        );
    }

};