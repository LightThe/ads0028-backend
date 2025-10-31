const jwt = require('jsonwebtoken');

function verificarToken(req,res,next) {
    const {authorization} = req.headers;
    if(authorization){
        try {
            const result = jwt.verify(authorization, process.env.JWT_SECRET);
            res.usuario = result;
            return next();
        } catch (error) {
            return res.status(401).json({ msg: "Token inválido"});
        }
    }
    return res.status(401).json({msg: "Não autorizado"});
}

function gerarToken(payload) {
    const expiresIn = 120;
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
        return token;
    } catch (error) {
        throw new Error("Erro ao gerar o token");
    }
}

module.exports = {
    gerarToken,
    verificarToken
}