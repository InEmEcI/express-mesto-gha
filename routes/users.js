const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getMyInfoById,
} = require('../controllers/users');

router.get('/users/me', getMyInfoById);

router.get('/users', getUsers);

router.get('/users/:_id', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
