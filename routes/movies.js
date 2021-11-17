const router = require('express').Router();

const { getMovies, createMovie, getMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.get('/:movieId', getMovie);

module.exports = router;
