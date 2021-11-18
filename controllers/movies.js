const ApiError = require('../exception/api-error');
const MovieModel = require('../models/movie');

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
        next(ApiError.BadRequestError('saas'));
      }
      next(err);
    });
};

module.exports.getMovie = (req, res, next) => {
  const { movieId } = req.params;
  MovieModel.findById(movieId)
    .orFail(() => ApiError.NotFoundError('Фильм по указанному _id не найден.'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ApiError.NotFoundError('Фильм по указанному _id не найден.'));
      }
      next(err);
    });
};
