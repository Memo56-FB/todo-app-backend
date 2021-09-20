const info = require('./logger').info

const requestLogger = (req, _res, next) => {
  info('-------------------------')
  info('Method: ', req.method)
  info('Path: ', req.path)
  info('Body: ', req.body)
  info('-------------------------')
  next()
}

module.exports = { requestLogger }
