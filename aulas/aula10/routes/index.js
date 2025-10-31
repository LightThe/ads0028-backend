const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


/* GET home page. */
router.get('/', auth.verificarToken, function(req, res, next) {
  const jorge = 'teste';
  res.json({ title: 'API Está ON', jorge });
});

module.exports = router;
