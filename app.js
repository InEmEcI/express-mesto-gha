/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6488c59f02b19803496a3d33',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
