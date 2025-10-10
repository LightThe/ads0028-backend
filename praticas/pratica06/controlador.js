const Tarefa = require('./modelo');


const adicionarTarefa = async (nome) => {
    const tarefa = new Tarefa(nome);
    await tarefa.init();
    
    await tarefa.inserir();
    return tarefa;
}

const buscarTarefa = async (nome) => {
    const tarefa = new Tarefa(nome);
    await tarefa.init();

    const tarefaDTO = await tarefa.buscar();
    if (tarefa.id) return tarefaDTO;
    else return null;
}

const atualizarTarefa = async (nome, concluida) => {
    const tarefa = new Tarefa(nome);
    await tarefa.init();

    await tarefa.buscar();
    if (tarefa.id) {
        tarefa.nome = nome;
        tarefa.concluida = concluida;
        await tarefa.alterar();
        return tarefa;
    }
    else return null;
}

const removerTarefa = async (nome) => {
    const tarefa = new Tarefa(nome);
    await tarefa.init();

    await tarefa.buscar();
    if (tarefa.id) {
        await tarefa.deletar();
        return tarefa;
    }
    else return null;
}

module.exports = {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa
}