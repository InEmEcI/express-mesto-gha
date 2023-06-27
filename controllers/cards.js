/* eslint-disable no-console */
const {
  INTERNAL_SERVER_ERROR,
  ERROR_CODE,
  NOT_FOUND_ERROR,
  FORBIDDEN_ERROR,
} = require('../utils/errors');

const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'На сервере произошла ошибка' }));
};

const createCard = (req, res) => {
  const bodyCard = { ...req.body, owner: req.user._id };
  Card.create(bodyCard)
    .then((card) => {
      res.status(201).send({ data: card });
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

// const deleteCardById = (req, res) => {
//   const cardId = req.params._id;
//   Card.findByIdAndRemove(cardId)
//     .then((cardInfo) => {
//       if (!cardInfo) {
//         res
//           .status(NOT_FOUND_ERROR)
//           .send({ message: 'Запрашиваемая карточка не найдена' });
//       } if (Card.owner.toString() !== req.user._id) {
//         res
//           .status(FORBIDDEN_ERROR)
//           .send({ message: 'Нельзя удалить чужую карточку' });
//       }
//       res.send({ data: cardInfo });
//     })

//     .catch((error) => {
//       if (error.name === 'CastError') {
//         res.status(ERROR_CODE).send({ message: 'ID неверный' });
//         return;
//       }
//       res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: 'На сервере произошла ошибка' });
//     });
// };

const deleteCardById = (req, res, next) => {
  // const cardId = req.params._id;
  // const userId = req.user._id;
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Запрашиваемая карточка не найдена' });
      }
      if (card.owner.toString() !== req.user._id) {
        res
          .status(FORBIDDEN_ERROR)
          .send({ message: 'Нельзя удалить чужую карточку' });
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((user) => res.status(200).send({ data: user }))
        .catch((error) => {
          if (error.name === 'CastError') {
            return next(
              res.status(ERROR_CODE).send({ message: 'ID неверный' }),
            );
          }
          return next(error);
        });
    })
    .catch(next);
};

const likeCard = (req, res) => {
  const idCard = req.params.cardId;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    idCard,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'ID неверный' });
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  const idCard = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    idCard,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR)
          .send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'ID неверный' });
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
