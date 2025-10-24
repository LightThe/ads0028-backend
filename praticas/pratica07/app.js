var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const url = `mongodb+srv://${process.env.MONGODB_USR}:${process.env.MONGODB_PSW}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
mongoose.connect(url, {})
    .then(() => console.debug("Conectou com o MongoDB em", process.env.MONGODB_HOST))
    .catch((err) => console.error("Segue dando o erro ", err.message));

const produtosRouter = require('./routes/produtosRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/produtos', produtosRouter);

module.exports = app;
