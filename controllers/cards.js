/* eslint-disable consistent-return */
/* eslint-disable no-console */
const ERROR_CODE = require('../utils/errors/ErrorCode');
const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError');
const FORBIDDEN_ERROR = require('../utils/errors/ForbiddenError');

const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const bodyCard = { ...req.body, owner: req.user._id };
  Card.create(bodyCard)
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE('Переданы некорректные данные'));
      }
      next(error);
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Запрашиваемая карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new FORBIDDEN_ERROR('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params._id)
        .then((user) => res.send({ data: user }))
        .catch((error) => {
          if (error.name === 'CastError') {
            throw new ERROR_CODE('ID неверный');
          }
          return next(error);
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const idCard = req.params.cardId;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    idCard,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Запрашиваемая карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ERROR_CODE('ID неверный'));
      }
      return next(error);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const idCard = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    idCard,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR('Запрашиваемая карточка не найдена');
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ERROR_CODE('ID неверный'));
      }
      return next(error);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
