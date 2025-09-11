const express = require("express");
const cors = require("cors");
const routerTarefa = require("./routerTarefa");

const app = express();
app.listen(3000, () => {
    console.log("App está ON!");
});

// middleware embutido
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// middleware de terceiros
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method + req.path + " Passou o middleware de aplicação!");
    next();
});

app.use('/tarefas', routerTarefa);

// middleware de erro
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Ocorreu um problema: sucesso!")
});
