const router = require('express').Router();

const {
  login,
  registration,
  logout,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', registration);
router.post('/logout', logout);

module.exports = router;
