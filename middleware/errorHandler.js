const error = require('./logger').error
const errorHandler = (err, req, res, next) => {
  error(err)

  next(err)
}

module.exports = { errorHandler }
