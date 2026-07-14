const token = window.Auth.obterToken();

if (!token) {
    window.location.replace("Login.html");
}