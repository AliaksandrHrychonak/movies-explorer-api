const router = require('express').Router();
const { validateCreateMovie } = require('../middlewares/validations-handler');
const { getMovies, createMovie, getMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.get('/:movieId', getMovie);

module.exports = router;
