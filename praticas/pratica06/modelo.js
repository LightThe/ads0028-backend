const conectarDB = require('./database');

class Tarefa {
    db = null;
    collection = null;

    id;
    nome;
    concluida;

    constructor(nome, concluida) {
        this.id = null;
        this.nome = nome;
        this.concluida = concluida ? true : false;
    }

    async init() {
        const db = await conectarDB();
        this.db = db;
        this.collection = db.collection('tarefas');
    }

    async inserir() {
        const resultado = await this.collection.insertOne({ nome: this.nome, concluida: this.concluida });
        this.id = resultado.insertedId;
    }

    async alterar() {
        await this.collection.updateOne({ _id: this.id }, { $set: { nome: this.nome, concluida: this.concluida } });
    }

    async deletar() {
        await this.collection.deleteOne({ nome: this.nome });
    }

    async buscar() {
        const resultado = await this.collection.findOne({ nome: this.nome });
        //todo resultado?
        if (resultado) {
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
            this.id = resultado._id;
            return resultado;
        }
        else return null;
    }
}

module.exports = Tarefa;