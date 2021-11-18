const router = require('express').Router();
const ApiError = require('../exception/api-error');
const errConfig = require('../utils/error-config');
const authMiddleware = require('../middlewares/auth');

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', authRouter);
router.use('/users', authMiddleware, usersRouter);
router.use('/movies', authMiddleware, moviesRouter);

router.all('*', () => { throw ApiError.NotFoundError(errConfig.not_found_error); });

module.exports = router;
