const mg = require('mongoose');
const Produto = require('../models/Produto');

async function criar(req, res) {
    try {
        const novoProduto = await Produto.create({ ...req.body });
        res.status(201).json(novoProduto);
    } catch (e) {
        if (e.errors) {
            return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" })
        }
        return res.status(500).json({ msg: "Serviço indisponível" })
    }
}

async function listar(req, res) {
    const produtosCadastrados = await Produto.find({});
    res.json(produtosCadastrados);
}

async function buscar(req, res, next) {
    const { id } = req.params;

    if (!mg.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Parâmetro inválido" })
    }

    const produtoEncontrado = await Produto.findOne({ _id: id });
    if (!produtoEncontrado) return res.status(404).json({ msg: "Produto não encontrado" });
    else {
        req.produto = produtoEncontrado;
        next();
    }
}

async function exibir(req, res) {
    res.json(req.produto);
}

async function atualizar(req, res) {
    const { id } = req.params;
    try {
        const produtoAtualizado = await Produto.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true, runValidators: true });

        res.status(200).json(produtoAtualizado);
    } catch (e) {
        if (e.errors) {
            return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" })
        }
        return res.status(500).json({ msg: "Serviço indisponível" })
    }
}

async function remover(req, res) {
    const { id } = req.params;
    const produtoRemovido = await Produto.findOneAndDelete({ _id: id });
    res.status(204).end();
}

module.exports = {
    criar,
    listar,
    buscar,
    exibir,
    atualizar,
    remover
}
