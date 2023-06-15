const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:_id', getUserById);

router.post('/users', createUser);

// PATCH /users/me — обновляет профиль
router.patch('/users/me', updateUser);
// PATCH /users/me/avatar — обновляет аватар
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
