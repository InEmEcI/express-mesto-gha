const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getAuthUserInfo,
} = require('../controllers/users');

const {
  updateUserVal,
  updateAvatarVal,
  getUserByIdVal,
} = require('../utils/validate');

router.get('/users/me', getAuthUserInfo);

router.get('/users', getUsers);

router.get('/users/:_id', getUserByIdVal, getUserById);

router.patch('/users/me', updateUserVal, updateUser);

router.patch('/users/me/avatar', updateAvatarVal, updateAvatar);

module.exports = router;
