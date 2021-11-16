const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');

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

module.exports = model('User', UserSchema);
