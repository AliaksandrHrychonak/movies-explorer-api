const ApiError = require('../exception/api-error');
const MovieModel = require('../models/movie');
const errConfig = require('../utils/error-config');

module.exports.getMovies = (req, res, next) => {
  MovieModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration, year,
    description, image,
    trailer, nameRU,
    nameEN, thumbnail,
    movieId,
  } = req.body;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user.id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError(errConfig.movie_create_error));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .orFail(() => ApiError.NotFoundError(errConfig.movie_error_id))
    .then((movie) => {
      if (movie.owner.toString() !== req.user.id.toString()) {
        next(ApiError.ForbiddenError(errConfig.movie_forbidden_error));
      }
      MovieModel.findByIdAndRemove(movieId)
        .then(() => res.send({ message: errConfig.movie_is_delete }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.NotFoundError(errConfig.movie_error_id));
      }
      next(err);
    });
};
