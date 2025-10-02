const ex = require('express');
const tarefaController = require('../controllers/tarefaController');
const router = ex.Router();

router.get('/', tarefaController.listar);
router.get('/:tarefaId', tarefaController.buscarPorId);
router.post('/', tarefaController.criar);
router.put('/:tarefaId', tarefaController.atualizar);
router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;
