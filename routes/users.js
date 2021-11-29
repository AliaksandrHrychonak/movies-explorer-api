const router = require('express').Router();

const {
  getUserMe,
  updateUserMe,
} = require('../controllers/users');

const { validateUpdateUserInfo } = require('../middlewares/validations-handler');

router.get('/me', getUserMe);
router.patch('/me', validateUpdateUserInfo, updateUserMe);

module.exports = router;
