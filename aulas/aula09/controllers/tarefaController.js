const listar = (req, res) => {
    res.json({});
};
const criar = (req, res) => {
    res.status(201).json({});
};
const buscar = (req, res, next) => {
    const { id } = req.params;
    next();
};
const exibir = (req, res) => {

    res.json({});
};
const atualizar = (req, res) => {

    res.json({});
};
const remover = (req, res) => {

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