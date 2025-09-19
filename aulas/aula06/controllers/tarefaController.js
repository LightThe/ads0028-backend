const tarefas = [];

const listarTarefas = (req, res) => {
    res.send(tarefas);
};

const criarTarefa = (req, res) => {
    const novaTarefa = { ...req.body };

    novaTarefa.id = Math.max(...tarefas.map(t => t.id), 1) + 1;
    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
};

const buscarTarefa = (req, res) => {
    const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
    if (tarefa) res.json(tarefa);
    else res.status(404).json({ msg: "Tarefa não encontrada" });
};

const editarTarefa = (req, res) => {
    const { nome, concluida } = req.body;
    const tarefa = tarefas.find((t) => t.id === parseInt(req.params.id));
    if (tarefa) {
        tarefa.nome = nome;
        tarefa.concluida = concluida;
        res.json(tarefa);
    }
    else res.status(404).json({ msg: "Tarefa não encontrada" });
};

const removerTarefa = (req, res) => {
    const tarefaIndex = tarefas.findIndex((t) => t.id === parseInt(req.params.id));
    if (tarefaIndex >= 0) {
        tarefas.splice(tarefaIndex, 1);
        res.status(204).end();
    }
    else res.status(404).json({ msg: "Tarefa não encontrada" });
};

module.exports = {
    listarTarefas,
    criarTarefa,
    buscarTarefa,
    editarTarefa,
    removerTarefa
};