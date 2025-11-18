const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const tarefasRouter = require('./routes/tarefas');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:8000'
}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/tarefas', tarefasRouter);

module.exports = app;
