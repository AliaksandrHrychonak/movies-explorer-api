const ApiError = require('../exception/api-error');

// eslint-disable-next-line consistent-return
module.exports = ((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      message: err.message,
    });
  }
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500
      ? 'На сервере ошибка'
      : message,
  });

  next();
});
