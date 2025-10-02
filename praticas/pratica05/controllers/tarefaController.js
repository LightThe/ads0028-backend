const tarefaModel = require('../models/tarefaModel');

const listar = (req, res) => {
    const resultado = tarefaModel.listar();
    res.json(resultado);
};

const buscarPorId = (req, res) => {
    const resultado = tarefaModel.buscarPeloId(req.params.tarefaId);
    if (!resultado) res.status(404).json({ msg: "Tarefa não encontrada" });
    else res.json(resultado);
};

const criar = (req, res) => {
    const resultado = tarefaModel.criar(req.body);
    res.status(201).json(resultado);
};

const atualizar = (req, res) => {
    const id = req.params.tarefaId;
    const resultado = tarefaModel.atualizar({ id, ...req.body });
    if (!resultado) res.status(404).json({ msg: "Tarefa não encontrada" });
    else res.json(resultado);
};

const remover = (req, res) => {
    const resultado = tarefaModel.remover(req.params.tarefaId);
    if (!resultado) res.status(404).json({ msg: "Tarefa não encontrada" });
    else res.status(204).end();
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    remover
};