const mg = require('mongoose');
const Tarefa = require('../models/tarefa');

const listar = async (req, res) => {
    try {
        const tarefas = await Tarefa.find({});
        res.json(tarefas);
    }
    catch (e) {
        res.status(500).json({ msg: "houve 1 (um) erro" })
    }
};
const criar = async (req, res) => {
    try {
        const novaTarefa = await Tarefa.create({ nome: req.body.nome, concluida: false });
        res.status(201).json(novaTarefa);
    } catch (e) {
        if(e.errors){
            return res.status(422).json({msg: e.errors.nome.message})
        }
        return res.status(500).json({msg: "O Request tá Bad"})
    }
    
};
const buscar = async (req, res, next) => {
    const { id } = req.params;

    // keep feelin' VALIDATION
    if (!mg.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID Inválido" });
    }

    const tarefaEncontrada = await Tarefa.findOne({ _id: id });
    if (!tarefaEncontrada) res.status(404).json({ msg: "Tarefa não encontrada" });
    else {
        req.tarefa = tarefaEncontrada;
        next();
    }
};
const exibir = (req, res) => {
    res.json(req.tarefa);
};
const atualizar = async (req, res) => {
    const { id } = req.params;
    try {
        const tarefaAtualizada = await Tarefa.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });
        res.json(tarefaAtualizada);
    } catch (e) {
        if(e.errors){
            return res.status(422).json({msg: e.errors.nome.message})
        }
        return res.status(500).json({msg: "O Request tá Bad"})
    }
};
const remover = async (req, res) => {
    const { id } = req.params;
    const tarefaRemovida = await Tarefa.findOneAndDelete({ _id: id });
    res.status(204).end();
};

module.exports = {
    listar,
    criar,
    buscar,
    exibir,
    atualizar,
    remover
}