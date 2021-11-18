const ApiError = require('../exception/api-error');
const tokenService = require('../controllers/tokens');

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const user = tokenService.validateAccessToken(accessToken);
    if (!user) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = user;
    return next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
