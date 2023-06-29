/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ERROR_CODE = require('../utils/errors/ErrorCode');
const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError');
const CONFLICTING_REQUEST_ERROR = require('../utils/errors/ConflictingRequestError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const user = req.params._id;
  User.findById(user)
    .then((userInfo) => {
      if (!userInfo) {
        throw new NOT_FOUND_ERROR('Запрашиваемый пользователь не найден');
      }
      res.send({ data: userInfo });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newInfo = user.toObject();
      delete newInfo.password;
      res.status(201).send(newInfo);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE('Переданы некорректные данные'));
      }
      if (error.code === 11000) {
        return next(
          new CONFLICTING_REQUEST_ERROR('Такой пользователь уже существует'),
        );
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(next);
};

const getAuthUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(
    idUser,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((userInfo) => {
      if (!userInfo) {
        return next(new ERROR_CODE('Запрашиваемый пользователь не найден'));
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE('Переданы некорректные данные'));
      }
      return next(error);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(idUser, { avatar }, { new: true, runValidators: true })
    .then((userInfo) => {
      if (!userInfo) {
        next(
          new NOT_FOUND_ERROR('Запрашиваемый пользователь не найден'),
        );
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new ERROR_CODE('Переданы некорректные данные'),
        );
      } else next(error);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser,
  login,
  getAuthUserInfo,
};
