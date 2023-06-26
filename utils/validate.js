/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const createUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      // eslint-disable-next-line comma-dangle
      /^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i
    ),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarVal = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      // eslint-disable-next-line comma-dangle
      /^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i
    ).required(),
  }),
});

// const getUsersVal = {
//     text: Joi.string().required().min(2),
// }

// const getMyInfoVal = {

// }

const createCardVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(
      // eslint-disable-next-line comma-dangle
      /^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i
    ).required(),
  }),
});

// getCards,
// createCard,
// deleteCardById,
// likeCard,
// dislikeCard,

module.exports = {
  loginVal,
  createUserVal,
  updateAvatarVal,
  updateUserVal,
  createCardVal,
};
