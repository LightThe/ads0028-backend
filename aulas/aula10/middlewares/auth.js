// AAAAAAAAAAAAAAAAAAAAAA
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = { email: payload.email, nome: payload.nome};
        next();
    } catch (error) {
        res.status(403).json({ msg: "Token inválido", error: error.message })
    }
}

function gerarToken(payload) {
    const expiresIn = 30; //seconds
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn }
        );
        return token;
    } catch (error) {
        throw new Error("AAAAAAAAAA");
    }
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
    renovarToken
}