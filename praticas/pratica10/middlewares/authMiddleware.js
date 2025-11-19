const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req, res, next) {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token inválido" })
    }
}

function gerarToken(payload) {
    const tempo = process.env.JWT_EXPIRES;
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: `${tempo}s` }
        );
        return token;
    } catch (error) {
        throw new Error("Erro ao gerar o token");
    }
}

function cifrarSenha(senha){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    return hash;
}

function compararSenha(senha, hash) {
    return bcrypt.compareSync(senha, hash);
}

function renovarToken(req, res) {
    try {
        const payload = req.payload;
        const token = gerarToken(payload);
        return res.json({token});
    } catch (error) {
        res.status(500).json({ msg: "Token inválido", error: error.message })
    }
}

module.exports = {
    verificarToken,
    gerarToken,
    cifrarSenha,
    compararSenha,
    renovarToken
}