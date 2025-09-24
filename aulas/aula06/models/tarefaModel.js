const tarefas = [];


const listar = () => {
    return tarefas;
};

const findById = (id) => {
    const tarefa = tarefas.find((t) => t.id === id);
    return tarefa;
};

const criar = (dados) => {
    const novaTarefa = { ...dados };
    novaTarefa.id = Math.max(...tarefas.map(t => t.id), 1) + 1;
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const atualizar = (tarefa) => {
    const tarefaEncontrada = tarefas.find((t) => t.id === parseInt(tarefa.id));
    if (tarefaEncontrada) {
        tarefaEncontrada.nome = tarefa.nome;
        tarefaEncontrada.concluida = tarefa.concluida;
    }
    return tarefaEncontrada;
};

const remover = (id) => {
    const tarefaIndex = tarefas.findIndex((t) => t.id === id);
    if (tarefaIndex >= 0) {
        tarefas.splice(tarefaIndex, 1);
        return true;
    }
    else return false;
};

module.exports = {
    listar,
    findById,
    criar,
    atualizar,
    remover
};