const { INTERNAL_SERVER_ERROR } = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
  if (error.statusCode) {
    res.status(error.statusCode).send({ message: error.message });
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: error.message || 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = errorHandler;
