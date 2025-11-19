const mg = require('mongoose');

const schema = new mg.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mg.model('Usuario', schema);