const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

const tarefaRouter = require('./routes/tarefas');

const url = `mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PSW}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
mongoose.connect(url, {})
    .then(() => console.debug("Conectou com o MongoDB em", process.env.MONGODB_HOST))
    .catch((err) => console.error("Segue dando o erro ", err.message))

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tarefas', tarefaRouter);

module.exports = app;
