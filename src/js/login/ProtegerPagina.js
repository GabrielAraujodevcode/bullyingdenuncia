const token = localStorage.getItem(
    "tokenAdministrador"
);

if (!token) {
    window.location.replace("login.html");
}