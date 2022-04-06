const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jsonWebToken = require('jsonwebtoken')

require('dotenv').config()

const { User } = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    response.status(401).json({ error: 'invalid user or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }
  const token = jsonWebToken.sign(userForToken, process.env.SECRET)
  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = { loginRouter }
