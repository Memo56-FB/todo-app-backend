const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
  logger.error('error name:', error.name)
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}
module.exports = errorHandler
