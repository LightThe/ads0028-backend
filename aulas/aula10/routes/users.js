const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res) {
  const { username, password } = req.body;

  if (username === "teste@iesb.br" && password === "teste") {
    const payload = {
      email: username,
      nome: "Cleytinho"
    }
    try {
      return res.json({ token: auth.gerarToken(payload) })
    } catch (error) {
      return res.status(500).json({ msg: "deu 1 (um) erro", error: error.message })
    }
  }

  return res.status(401).json({msg: "Credenciais inválidas"});
});

router.post('/renovar', auth.verificarToken, auth.renovarToken);

module.exports = router;
