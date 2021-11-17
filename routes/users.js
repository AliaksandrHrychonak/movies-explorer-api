const router = require('express').Router();

const {
  getUserMe,
  updateUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUserMe);

module.exports = router;
