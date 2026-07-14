const express = require("express");

const router = express.Router();

const denunciaController = require(
    "../controllers/denunciaController"
);

const {
    autenticarAdministrador
} = require("../middlewares/authMiddleware");


/* ROTAS PÚBLICAS */

router.post(
    "/",
    denunciaController.criarDenuncia
);

router.get(
    "/protocolo/:protocolo",
    denunciaController.buscarDenunciaPorProtocolo
);


/* ROTAS PRIVADAS */

router.get(
    "/",
    autenticarAdministrador,
    denunciaController.listarDenuncias
);

router.patch(
    "/:id",
    autenticarAdministrador,
    denunciaController.atualizarDenuncia
);

module.exports = router;