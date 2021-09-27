const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const { User } = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    response.status(401).json({ error: 'invalid user or password' })
  }
  response.send({
    name: user.name,
    username: user.username
  })
})

module.exports = { loginRouter }
