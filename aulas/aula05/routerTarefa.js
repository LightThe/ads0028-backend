const express = require("express");

const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (id == 1) res.send("Objeto com o ID " + id + " encontrado");
    throw new Error("Ih menina!");
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    if (id == 1) res.send("alterado com sucesso");
    res.status(404).send("Esse registro não existe e nunca existiu ")
})

router.delete('/:id', (req, res) => {
    res.status(204).end(); //devolve a requisição sem corpo
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send("Foi criado (eu acho)");
});

module.exports = router;