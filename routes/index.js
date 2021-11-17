const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

// const authRouter = require();
const userRouter = require('./users');

router.use('/users', authMiddleware, userRouter);
router.use('/', require('./auth'));

module.exports = router;
