const express = require("express");
const cors = require("cors");

const denunciaRoutes = require(
    "./routes/denunciaRoutes"
);

const authRoutes = require(
    "./routes/authRoutes"
);
const comentarioRoutes = require(
    "./routes/comentarioRoutes"
);
const noticiaRoutes = require(
    "./routes/noticiaRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        mensagem: "API funcionando"
    });
});

app.use(
    "/api/denuncias",
    denunciaRoutes
);

app.use(
    "/api/auth",
    authRoutes
);
app.use(
    "/api/comentarios",
    comentarioRoutes
);
app.use(
    "/api/noticias",
    noticiaRoutes
);

module.exports = app;