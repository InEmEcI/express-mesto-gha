/* eslint-disable no-console */
const { INTERNAL_SERVER_ERROR, ERROR_CODE, NOT_FOUND_ERROR } = require('../utils/errors');

const Card = require('../models/card');

const createCard = (req, res) => {
  const bodyCard = { ...req.body, owner: req.user._id };
  Card.create(bodyCard)
    .then((card) => { res.status(201).send({ data: card }); })
    .catch((error) => console.log(`Произошла ошибка ${error}`));
};

const getCards = (req, res) => {
  Card.find({}).then((card) => {
    res.status(200).send(card);
  }).catch((error) => console.log(`Произошла ошибка ${error}`));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params._id).then((card) => {
    res.status(200).send({ data: card });
  }).catch((error) => console.log(`Произошла ошибка ${error}`));
};

const likeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'ID неверный' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(ERROR_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }
    res.send({ data: card });
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE).send({ message: 'ID неверный' });
      return;
    }
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
};
