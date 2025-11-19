const { cifrarSenha, compararSenha, gerarToken } = require('../middlewares/authMiddleware');
const usuarioModel = require('../models/Usuario');

const criar = async (req, res) => {
    try {
        const senhaCifrada = cifrarSenha(req.body.senha);
        const novoUsuario = await usuarioModel.create({ email: req.body.email, senha: senhaCifrada });
        return res.status(201).json({ '_id': novoUsuario._id, "email": novoUsuario.email });
    } catch (e) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

const entrar = async (req, res) => {
    const usuarioEncontrado = await usuarioModel.findOne({ email: req.body.usuario });
    if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
        const token = gerarToken({ email: req.body.usuario });
        return res.status(200).json({ token });
    }
    else {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
}

const renovar = async (req, res) => {
    const token = gerarToken({ email: req.usuario })
    return res.status(200).json({ token });
}

const remover = async (req, res) => {
    const usuarioRemovido = await usuarioModel.findOneAndDelete({ _id: req.params.id });
    if (usuarioRemovido) {
        return res.status(204).end();
    }
}

module.exports = {
    criar,
    entrar,
    renovar,
    remover
}