const express = require("express");

const router = express.Router();

const noticiaController = require(
    "../controllers/noticiaController"
);

const {
    autenticarAdministrador
} = require("../middlewares/authMiddleware");


/* ROTA PÚBLICA */

router.get(
    "/",
    noticiaController.listarNoticias
);


/* ROTAS PRIVADAS */

router.post(
    "/",
    autenticarAdministrador,
    noticiaController.criarNoticia
);

router.delete(
    "/:id",
    autenticarAdministrador,
    noticiaController.excluirNoticia
);

module.exports = router;