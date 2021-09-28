const jsonWebToken = require('jsonwebtoken')
module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  let decodedToken = {}
  try {
    decodedToken = jsonWebToken.verify(token, process.env.SECRET)
  } catch (error) {}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const userId = decodedToken.id

  request.userId = userId

  next()
}
