const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  INTERNAL_SERVER_ERROR,
  ERROR_CODE,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICTING_REQUEST_ERROR,
} = require('../utils/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const user = req.params._id;
  User.findById(user)
    .then((userInfo) => {
      if (!userInfo) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: userInfo });
    })
    .catch(next);
  // => {
  //   if (error.name === 'CastError') {
  //     res.status(ERROR_CODE).send({ message: 'ID неверный' });
  //     return;
  //   }
  //   res
  //     .status(INTERNAL_SERVER_ERROR)
  //     .send({ message: 'На сервере произошла ошибка' });
  // });
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
      res.send(newInfo);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          res
            .status(ERROR_CODE)
            .send({ message: 'Переданы некорректные данные' }),
        );
      }
      if (error.code === 11000) {
        next(
          res
            .status(CONFLICTING_REQUEST_ERROR)
            .send({ message: 'Такой пользователь уже существует' }),
        );
      }
      next(error);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(() => {
      res
        .status(UNAUTHORIZED_ERROR)
        .send({ message: 'Ошибка при авторизации' });
    });
};

// .then((user) => {
//       const newInfo = user.toObject();
//       delete newInfo.password;
//       res.send(newInfo);
//     })

const getAuthUserInfo = (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (!user) {
      res
        .status(ERROR_CODE)
        .send({ message: 'Запрашиваемый пользователь не найден' });
    } else {
      const newInfo = user.toObject();
      delete newInfo.password;
      res.send(newInfo);
    }
  });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(
    idUser,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((userInfo) => {
      if (!userInfo) {
        res
          .status(ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const idUser = req.user._id;
  User.findByIdAndUpdate(idUser, { avatar }, { new: true, runValidators: true })
    .then((userInfo) => {
      if (!userInfo) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: userInfo });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'На сервере произошла ошибка' });
      }
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
