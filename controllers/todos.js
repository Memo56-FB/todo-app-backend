const todoRouter = require('express').Router()
const { Todo } = require('../models/todoSchema')

todoRouter.get('/', (req, res, next) => {
  Todo.find({})
    .then(todo => res.json(todo))
    .catch(error => next(error))
})
todoRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => res.status(200).send(todo))
    .catch(error => next(error))
})

todoRouter.post('/', (req, res, next) => {
  const { body } = req
  const { content, complete } = body
  if (!body || !content) {
    res.status(400).json({ error: 'content missing' })
  } else {
    const newTodo = new Todo({
      content,
      date: new Date(),
      complete
    })
    newTodo.save()
      .then(savedTodo => res.status(201).json(savedTodo))
      .catch(error => next(error))
  }
})

todoRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Todo.findByIdAndRemove(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})
todoRouter.put('/:id', (req, res, next) => {
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
  Todo.findByIdAndUpdate(id, todo, { new: true })
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

module.exports = { todoRouter }