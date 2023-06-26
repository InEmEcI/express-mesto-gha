const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getMyInfoById,
} = require('../controllers/users');

const { updateUserVal, updateAvatarVal } = require('../utils/validate');

router.get('/users/me', getMyInfoById);

router.get('/users', getUsers);

router.get('/users/:_id', getUserById);

router.patch('/users/me', updateUserVal, updateUser);

router.patch('/users/me/avatar', updateAvatarVal, updateAvatar);

module.exports = router;
