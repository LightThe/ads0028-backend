const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const tarefas = [];

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.get('/tarefas', (req, res) => {
    res.send(tarefas);
});
app.post('/tarefas', (req, res) => {
    const novaTarefa = { ...req.body }

    novaTarefa.id = Math.max(...tarefas.map(t => t.id), 1) + 1;
    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

app.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
    if (tarefa) res.json(tarefa);
    else res.status(404).json({ msg: "Tarefa não encontrada"});
});

module.exports = app;
