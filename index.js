const http = require('http')
const express = require('express')
require('./mongo')

const { Todo } = require('./models/todoSchema')
const app = express()
const cors = require('cors')

const notFound = require('./middleware/404').notFound
const requestLogger = require('./middleware/requestLogger').requestLogger
const errorHandler = require('./middleware/errorHandler')

http.createServer(app)
app.use(cors())
app.use(express.json()) // De esta forma se puede leer el body del post
app.use(requestLogger)

app.get('/api/todo', (req, res, next) => {
  Todo.find({})
    .then(todo => res.json(todo))
    .catch(error => next(error))
})
app.get('/api/todo/:id', (req, res, next) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => res.status(200).send(todo))
    .catch(error => next(error))
})

app.post('/api/todo', (req, res, next) => {
  const body = req.body
  if (!body || !body.content) {
    res.status(400).json({ error: 'content missing' })
  } else {
    const newTodo = new Todo({
      content: body.content
    })
    newTodo.save()
      .then(savedTodo => res.status(201).json(savedTodo))
      .catch(error => next(error))
  }
})

app.delete('/api/todo/:id', (req, res, next) => {
  const id = req.params.id
  Todo.findByIdAndRemove(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})
app.put('/api/todo/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const todo = {
    content: body.content
  }
  Todo.findByIdAndUpdate(id, todo, { new: true })
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('Server running on port: ', PORT)
