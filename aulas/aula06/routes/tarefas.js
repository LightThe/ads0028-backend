const ex = require('express');
const router = ex.Router();
const controller = require('../controllers/tarefaController');

router.get('/', controller.listarTarefas);
router.post('/', controller.criarTarefa);
router.get('/:id', controller.buscarTarefa, controller.obterTarefa);
router.put('/:id', controller.buscarTarefa, controller.editarTarefa);
router.delete('/:id', controller.buscarTarefa, controller.removerTarefa);

module.exports = router;