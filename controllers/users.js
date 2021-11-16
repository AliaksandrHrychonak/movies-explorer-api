const UserModel = require('../models/user');

class UsersControllers {
  async getUserMe(req, res, next) {
    try {
      const id = req.user._id;
      const user = await UserModel.findById(id);
      if (!user) {
        console.log('пользователь не найден');
      }
    } catch (e) {
      next(e);
    }
  }

  async registration(req, res, next) {
    try {
      const { email, password, name } = req.body;

      const newUser = await UserModel.create()
    } catch (e) {

    }
  }
}

module.exports = new UsersControllers();
