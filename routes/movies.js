const router = require('express').Router();
const { validateCreateMovie } = require('../middlewares/validations-handler');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
