const express = require("express");
const cors = require("cors");

const denunciaRoutes = require("./routes/denunciaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        mensagem: "API funcionando"
    });
});

app.use("/api/denuncias", denunciaRoutes);

module.exports = app;