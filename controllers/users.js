const bcrypt = require('bcryptjs');
const ApiError = require('../exception/api-error');
const UserModel = require('../models/user');
const { generateToken } = require('./tokens');
const errConfig = require('../utils/error-config');

const { NODE_ENV } = process.env;
const { SALT } = NODE_ENV === 'production' ? process.env : require('../utils/config');

module.exports.getUserMe = (req, res, next) => {
  UserModel.findById(req.user.id)
    .orFail(() => ApiError.NotFoundError(errConfig.incorrect_data_id))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ApiError.NotFoundError(errConfig.incorrect_data_id));
      }
      next(err);
    });
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    next(ApiError.BadRequestError(errConfig.incorrect_data_user));
  }
  UserModel.findOne({ email })
    .then((candidate) => {
      if (candidate) {
        next(ApiError.ConflictError(errConfig.incorrect_data_already_registered));
      } else {
        UserModel.findByIdAndUpdate(
          req.user.id,
          { name, email },
          { runValidators: true, new: true },
        )
          .orFail(() => ApiError.NotFoundError(errConfig.incorrect_data_user_update))
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError(errConfig.incorrect_data_user_update));
      }
      if (err.code === 11000) {
        next(ApiError.ConflictError(errConfig.incorrect_data_already_registered));
      }
      next(err);
    });
};

module.exports.registration = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    next(ApiError.ConflictError(errConfig.incorrect_data_user));
  }
  bcrypt.hash(password, Number(SALT))
    .then((hash) => UserModel.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({ id: user._id, name: user.name, email: user.email });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError(errConfig.incorrect_data_user));
      } else if (err.code === 11000) {
        next(ApiError.ConflictError(errConfig.incorrect_data_already_registered));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ id: user._id });
      res.send({
        token, id: user._id, name: user.name, email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ApiError.BadRequestError(errConfig.incorrect_data_user));
      }
      next(err);
    });
};
