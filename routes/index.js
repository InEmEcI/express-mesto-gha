const router = require('express').Router();

const { NOT_FOUND_ERROR } = require('../utils/errors');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use(userRoutes);
router.use(cardRoutes);
router.use('/*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});
module.exports = router;
