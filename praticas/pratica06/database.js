const { MongoClient } = require('mongodb');
require("dotenv").config();

const url = process.env.DB_URL;

const client = new MongoClient(url);

async function conectarDB() {
    try {
        client.connect();
        return client.db('agenda');    
    } catch (e) {
        console.error("Houve um erro ao conectar: ", e.message)
    }
}

module.exports = conectarDB;