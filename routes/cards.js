const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  // dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:_id', deleteCardById);

// поставить лайк карточке
// PUT /cards/:cardId/likes
router.put('/cards/:cardId/likes', likeCard);

// убрать лайк с карточки
// DELETE /cards/:cardId/likes
// router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
