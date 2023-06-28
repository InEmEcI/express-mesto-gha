/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(reg),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarVal = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(reg).required(),
  }),
});

const createCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(reg).required(),
  }),
});

const getUserByIdVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const deleteCardByIdVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const dislikeCardVal = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const likeCardVal = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginVal,
  createUserVal,
  updateAvatarVal,
  updateUserVal,
  createCardVal,
  getUserByIdVal,
  dislikeCardVal,
  likeCardVal,
  deleteCardByIdVal,
};
