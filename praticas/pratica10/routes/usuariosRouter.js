const ejs = require('express');
const usuariosController = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');

const router = ejs.Router();

router.post('/', usuariosController.criar);
router.post('/login', usuariosController.entrar);
router.post('/renovar', verificarToken, usuariosController.renovar);
router.delete('/:id', verificarToken, usuariosController.remover);

module.exports = router;