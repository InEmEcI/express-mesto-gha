const router = require('express').Router();

const { loginVal, createUserVal } = require('../utils/validate');
const { NOT_FOUND_ERROR } = require('../utils/errors');

const auth = require('../middlewares/auth');

const cardRoutes = require('./cards');
const userRoutes = require('./users');

const { login, createUser } = require('../controllers/users');

router.post('/signin', loginVal, login);
router.post('/signup', createUserVal, createUser);

router.use(auth);

router.use(userRoutes);
router.use(cardRoutes);

router.use('/', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

module.exports = router;
