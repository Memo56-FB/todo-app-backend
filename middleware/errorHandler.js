const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
  logger.info('!!=========================!!')
  logger.error('Error name: ', error.name)
  logger.info('!!=========================!!')
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.errors.username.properties.message.includes('Error, expected `username` to be unique.')) {
    response.status(400).json({ error: 'Username already taken' })
  }
  next(error)
}
module.exports = errorHandler
