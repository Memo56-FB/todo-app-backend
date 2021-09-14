const info = require('./logger').info

const requestLogger = (req, _res, next) => {
  info(req.method)
  info(req.path)
  info(req.body)
  next()
}

module.exports = { requestLogger }
