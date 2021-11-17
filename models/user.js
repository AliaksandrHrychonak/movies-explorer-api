const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const ApiError = require('../exception/api-error');

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Формат email не верный!',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

UserSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw ApiError.UnauthorizedError('unauth');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw ApiError.UnauthorizedError('unauth');
          }
          return user;
        });
    });
};
module.exports = model('User', UserSchema);
