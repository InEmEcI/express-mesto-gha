const router = require('express').Router();

const {
  createCardVal,
  dislikeCardVal,
  likeCardVal,
  deleteCardByIdVal,
} = require('../utils/validate');
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCardVal, createCard);

router.delete('/cards/:_id', deleteCardByIdVal, deleteCardById);

router.put('/cards/:cardId/likes', likeCardVal, likeCard);

router.delete('/cards/:cardId/likes', dislikeCardVal, dislikeCard);

module.exports = router;
