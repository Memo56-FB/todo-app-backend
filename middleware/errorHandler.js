const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
  logger.info('!!=========================!!')
  logger.error('error name:', error.name)
  logger.info('!!=========================!!')
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}
module.exports = errorHandler
