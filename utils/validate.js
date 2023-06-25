/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    abour: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      // eslint-disable-next-line comma-dangle
      /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/
    ),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// const createUserVal = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     abour: Joi.string().min(2).max(30),
//     avatar: Joi.string().regex(
//       // eslint-disable-next-line comma-dangle
//       /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/
//     ),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// });

// const getUsersVal = {
//     text: Joi.string().required().min(2),
// }

// const getUserByIdVal = {

// }

// const updateUser = {

// };

// const updateAvatarVal = {

// }

// const getMyInfoVal = {

// }

// createUser
// getCards,
// createCard,
// deleteCardById,
// likeCard,
// dislikeCard,

module.exports = {
  loginVal,
  createUserVal,
};
