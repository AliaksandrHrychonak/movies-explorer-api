const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', authRouter);
router.use('/users', authMiddleware, usersRouter);
router.use('/movies', authMiddleware, moviesRouter);

// router.all('*', (req, res) => {})

module.exports = router;
