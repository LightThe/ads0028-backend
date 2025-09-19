const ex = require('express');
const router = ex.Router();
const controller = require('../controllers/tarefaController');

router.get('/', controller.listarTarefas);
router.post('/', controller.criarTarefa);
router.get('/:id', controller.buscarTarefa);
router.put('/:id', controller.editarTarefa);
router.delete('/:id', controller.removerTarefa);

module.exports = router;