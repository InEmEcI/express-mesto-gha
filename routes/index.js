const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use(userRoutes);
router.use(cardRoutes);
router.use('/*', (req, res) => {
  res.status(404).send({ messege: 'Страница не найдена' });
});
module.exports = router;
