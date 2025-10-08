const { MongoClient } = require('mongodb');
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const client = new MongoClient(DB_URL);
async function conectar() {
    try {
        await client.connect();
        return client.db("agenda");
    } catch (e) {
        console.error("Erro ao dar o erro no banco de erros", e.message);
    }
};

module.exports = conectar;