/* eslint-disable no-console */
const { INTERNAL_SERVER_ERROR, ERROR_CODE, NOT_FOUND_ERROR } = require('../utils/errors');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).then((user) => {
    res.status(200).send(user);
  });
};

const getUserById = (req, res) => {
  const user = req.params._id;
  User.findById(user)
    .then((userData) => res.status(200).send({ data: userData }));
};

const createUser = (req, res) => {
  const newUserData = req.body;
  User.create(newUserData)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => console.log(`Произошла ошибка ${error}`));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(idUser, { name, about }, { new: true, runValidators: true })
    .then((userInfo) => {
      if (!userInfo) {
        res.status(ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(idUser, { avatar }, { new: true, runValidators: true })
    .then((userInfo) => {
      if (!userInfo) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser,
};
