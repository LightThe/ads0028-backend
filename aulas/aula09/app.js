const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

const tarefaRouter = require('./routes/tarefas');

const url = `mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PSW}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url, {})
    .then(() => console.log("conectou com o db"))
    .catch((err) => console.error("Segue dando o erro ", err.message))

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tarefas', tarefaRouter);

module.exports = app;
