const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const { User } = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('todos', {
    content: 1,
    date: 1
  })
  response.json(users)
})

userRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const { username, name, password } = body
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = { userRouter }
