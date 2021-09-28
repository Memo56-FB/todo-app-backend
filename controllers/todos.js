const todoRouter = require('express').Router()
const { Todo } = require('../models/todoSchema')
const { User } = require('../models/user')
const jsonWebToken = require('jsonwebtoken')

require('dotenv').config()

todoRouter.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find({}).populate('user', {
      todos: 0
    })
    res.json(todos)
  } catch (error) {
    next(error)
  }
})
todoRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const todo = await Todo.findById(id).populate('user', {
      todos: 0
    })
    res.status(200).send(todo)
  } catch (error) {
    next(error)
  }
})

todoRouter.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const { content, complete } = body

    const authorization = req.get('authorization')
    let token = null
    if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = jsonWebToken.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const userId = decodedToken.id

    const user = await User.findById(userId)
    if (!body || !content) {
      res.status(400).json({ error: 'content missing' })
    } else {
      const newTodo = new Todo({
        content,
        date: new Date(),
        complete,
        user: user._id
      })
      const savedTodo = await newTodo.save()

      user.todos = user.todos.concat(savedTodo._id)
      await user.save()

      res.status(201).json(savedTodo)
    }
  } catch (error) {
    next(error)
  }
})

todoRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Todo.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
todoRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const { content, complete } = body
  let todo = null

  if (!content) {
    todo = {
      complete
    }
  } else if (!complete) {
    todo = {
      content
    }
  } else {
    todo = {
      content,
      complete
    }
  }
  try {
    const todoUpdated = await Todo.findByIdAndUpdate(id, todo, { new: true })
    res.status(200).json(todoUpdated)
  } catch (error) {
    next(error)
  }
})

module.exports = { todoRouter }
