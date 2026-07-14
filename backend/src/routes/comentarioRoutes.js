const express = require("express");

const router = express.Router();

const comentarioController = require(
    "../controllers/comentarioController"
);

const {
    autenticarAdministrador
} = require("../middlewares/authMiddleware");


/* PÚBLICAS */

router.get(
    "/",
    comentarioController.listarComentarios
);

router.post(
    "/",
    comentarioController.criarComentario
);


/* PRIVADA */

router.delete(
    "/:id",
    autenticarAdministrador,
    comentarioController.excluirComentario
);

module.exports = router;