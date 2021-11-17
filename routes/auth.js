const router = require('express').Router();

const {
  login,
  registration,
} = require('../controllers/users');

const { validateReqistration, validateLogin } = require('../middlewares/validations-handler');

router.post('/signin', validateLogin, login);
router.post('/signup', validateReqistration, registration);

module.exports = router;
