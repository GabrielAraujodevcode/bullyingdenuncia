const express = require("express");

const router = express.Router();

const denunciaController = require(
    "../controllers/denunciaController"
);

router.post(
    "/",
    denunciaController.criarDenuncia
);

router.get(
    "/",
    denunciaController.listarDenuncias
);

router.get(
    "/protocolo/:protocolo",
    denunciaController.buscarDenunciaPorProtocolo
);
router.patch(
    "/:id",
    denunciaController.atualizarDenuncia
);

module.exports = router;