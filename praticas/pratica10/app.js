const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mg = require('mongoose');

require('dotenv').config();

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
mg.connect(url, {})
    .then(() => console.debug("Conectou com o MongoDB em", process.env.MONGODB_HOST))
    .catch((err) => console.error("Ocorreu o erro ", err.message));

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;
