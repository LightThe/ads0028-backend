const express = require("express");

const app = express();
app.listen(3000, () => {
    console.log("App está ON!");
});

app.use((req, res, next) => {
    console.log(req.method + req.path + " Passou o middleware de aplicação!");
    next();
});

// middleware de rota (router?)
const router = express.Router();
app.use(router);

router.get('/', (req, res) => {
    res.send("Rota GET /");
});

const routerTarefas = express.Router();
app.use('/tarefas', routerTarefas);

routerTarefas.get('/:id', (req, res) => {
    const { id } = req.params;
    if (id == 1) res.send("Objeto com o ID " + id + " encontrado");
    throw new Error("Ih menina!");
})

routerTarefas.post('/', (req, res) => {
    res.status(201).send("Foi criado (eu acho)");
})

// middleware de erro
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Ocorreu um problema: sucesso!")
});
