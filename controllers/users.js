const bcrypt = require('bcryptjs');
const ApiError = require('../exception/api-error');
const UserModel = require('../models/user');
const generateToken = require('./tokens');

const { SALT } = process.env;

module.exports.getUserMe = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await UserModel.findById(id)
      .orFail(() => next());
    res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports.updateUserMe = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await UserModel.findById(id)
      .orFail(() => next());
    res.send(user);
  } catch (e) {
    next(e);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ email, password: hash, name })
      .orFail(() => ApiError.BadRequest('есть'));
    if (newUser) {
      res.status(201).send(newUser);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      throw ApiError.BadRequest('есть');
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
      throw ApiError.BadRequest('есть');
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findUserByCredentials(email, password);
    if (!user) {
      throw ApiError.ConflictError();
    }
    const token = await generateToken({ id: user._id });
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: false,
      secure: true,
    }).send({ message: 'Вход в аккаунт выполнен успешно!' });
  } catch (e) {
    next(e);
  }
};

// eslint-disable-next-line consistent-return
module.exports.logout = async (req, res, next) => {
  try {
    return res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: false,
      secure: true,
    }).send({ message: 'Выход из аккаунта выполнен успешно!' });
  } catch (err) {
    next(err);
  }
};
