const model = require('../models/tarefaModel');

const listarTarefas = (req, res) => {
    res.send(model.listar());
};

const criarTarefa = (req, res) => {
    const novaTarefa = model.criar(req.body);
    res.status(201).json(novaTarefa);
};

const buscarTarefa = (req, res, next) => {
    const tarefa = model.findById(parseInt(req.params.id));
    if (tarefa) {
        req.tarefa = tarefa;
        next();
    }
    else res.status(404).json({ msg: "Tarefa não encontrada" });
};

const obterTarefa = (req, res) => {
    res.json(req.tarefa);
};

const editarTarefa = (req, res) => {
    const { id } = req.params;
    const tarefa = model.atualizar({ id, ...req.body });
    res.json(tarefa);
};

const removerTarefa = (req, res) => {
    model.remover(parseInt(req.params.id));
    res.status(204).end();
};

module.exports = {
    listarTarefas,
    criarTarefa,
    buscarTarefa,
    obterTarefa,
    editarTarefa,
    removerTarefa
};