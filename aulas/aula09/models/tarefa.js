const mg = require('mongoose');

const schema = new mg.Schema({
    nome: {
        type: String, 
        required: [true, "Nome da tarefa é obrigatório"],
        trim: true
    },
    concluida: Boolean,
});

module.exports = mg.model('tarefa', schema);