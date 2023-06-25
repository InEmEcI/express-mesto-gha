/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

// const errorHandler = require('./middlewares/errorHandler');

const app = express();

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(router);

// app.use(errorHandler);
app.use(errors()); // обработчик ошибок celebrate

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
