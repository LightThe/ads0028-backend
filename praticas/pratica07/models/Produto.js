const mg = require('mongoose');

const schema = new mg.Schema({
    nome:{
        type: String,
        required: [true, "Nome e preço do produto são obrigatórios"],
        trim: true
    },
    preco: {
        type: Number,
        required: [true, "Nome e preço do produto são obrigatórios"]
    }
})

module.exports = mg.model('produto', schema);