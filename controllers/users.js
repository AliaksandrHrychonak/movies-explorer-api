const bcrypt = require('bcryptjs');
const ApiError = require('../exception/api-error');
const UserModel = require('../models/user');
const {
  generateToken,
} = require('./tokens');

const { SALT } = process.env;

module.exports.getUserMe = (req, res, next) => {
  UserModel.findById(req.user.id)
    .orFail(() => ApiError.BadRequestError('fail'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError('Переданы некорректные данные пользователя.'));
      }
      next(err);
    });
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    next(ApiError.BadRequestError('Переданы некорректные данные пользователя.'));
    return;
  }
  UserModel.findByIdAndUpdate(req.user.id, { name, email }, { runValidators: true, new: true })
    .orFail(() => ApiError.NotFoundError('fail'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError('Переданы некорректные'));
      }
      next(err);
    });
};

module.exports.registration = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    next(ApiError.UnauthorizedError('unauth'));
  }
  bcrypt.hash(password, Number(SALT))
    .then((hash) => UserModel.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send(user);
      }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError('bad'));
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(ApiError.ConflictError('conf'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(ApiError.UnauthorizedError('unauth'));
  }
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ id: user._id });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
