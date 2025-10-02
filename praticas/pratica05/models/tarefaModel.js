const tarefas = [];

const listar = () => {
    return tarefas;
};

const buscarPeloId = (tarefaId) => {
    const tarefaEncontrada = tarefas.find((t) => t.id == tarefaId );
    if (tarefaEncontrada) return tarefaEncontrada;
    else return null;
};

const criar = (tarefa) => {
    const novaTarefa = { ...tarefa }
    novaTarefa.id = crypto.randomUUID();
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const atualizar = (tarefa) => {
    const tarefaEncontrada = tarefas.find((t) => t.id == tarefa.id);
    if (tarefaEncontrada) {
        tarefaEncontrada.nome = tarefa.nome;
        tarefaEncontrada.concluida = tarefa.concluida;
    }
    return tarefaEncontrada;
};

const remover = (tarefaId) => {
    const tarefaIndex = tarefas.findIndex((t) => t.id == tarefaId);
    if (tarefaIndex >= 0) {
        tarefas.splice(tarefaIndex, 1);
        return tarefaId;
    }
    else return null;
};

module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover
};
