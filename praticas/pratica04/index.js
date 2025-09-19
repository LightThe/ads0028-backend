// import express from 'express';

const ex = require('express');

const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
];

const port = 3000;
const app = ex();
app.listen(port, () => {
    console.log("Iniciou Express na porta " + port);
});

app.use(ex.json());

app.use((req, res, next) => {
    const { method, path } = req;
    const timestamp = new Date().toJSON();
    console.log(`${timestamp} Requisição: ${method} ${path}`);
    next();
});

// Middleware de rotas tarefas
const routerTarefas = ex.Router();
app.use('/tarefas', routerTarefas);

routerTarefas.get('/', (req, res) => {
    res.send(tarefas);
});

routerTarefas.post('/', (req, res) => {
    const { body } = req;

    // Encontra o próximo id (de forma meio custosa)
    body.id = Math.max(...tarefas.map(t => t.id), 1) + 1;

    tarefas.push(body);
    console.log(`Adicionou tarefa: ${body.nome}`);
    res.status(201).send(body);
});

routerTarefas.get('/:id', (req, res) => {
    const { id } = req.params;
    const tarefa = tarefas.find((t) => t.id == id);

    if (tarefa) res.send(tarefa);
    else throw new Error("Tarefa não localizada");
});

routerTarefas.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const tarefaIndex = tarefas.findIndex((t) => t.id == id);

    if (tarefaIndex > 0) {
        tarefas.splice(tarefaIndex, 1);
        tarefas.push(body);
        res.send(body);
    }
    else throw new Error("Tarefa não localizada");
});

routerTarefas.delete('/:id', (req, res) => {
    const { id } = req.params;
    const tarefaIndex = tarefas.findIndex((t) => t.id == id);

    if (tarefaIndex >= 0) {
        tarefas.splice(tarefaIndex, 1);
        res.status(204).end();
    }
    else throw new Error("Tarefa não localizada");
});

// Middleware de erro
app.use((err, req, res, next) => {
    const { message } = err;
    console.error(`ERRO: ${message}`);
    res.status(400).send(message);
});

module.exports = app;