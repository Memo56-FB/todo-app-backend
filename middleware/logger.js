const info = (logger) => {
  console.log(logger)
}

const logger = (req, res, next) => {
  info(req.method)
  info(req.path)
  info(req.body)
  next()
}

module.exports = { logger }
