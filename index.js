const http = require('http')
const express = require('express')

const app = express()
const cors = require('cors')

const notFound = require('./middleware/404').notFound
const requestLogger = require('./middleware/requestLogger').requestLogger
const errorHandler = require('./middleware/errorHandler').errorHandler

http.createServer(app)
app.use(cors())
app.use(express.json()) // De esta forma se puede leer el body del post
app.use(requestLogger)
let todoList = [
  {
    content: 'Sacar al perro'
  },
  {
    content: 'Cortar la leña'
  },
  {
    content: 'Hacer ejercio'
  }
]

app.get('/api/todo', (req, res) => {
  res.json(todoList)
})
app.get('/api/todo/:id', (req, res) => {
  const id = req.params.id
  const todo = todoList.find(todo => todo.id === id)
  todo
    ? res.status(200).send(todo)
    : res.status(404).json({ error: 'malformatted id' })
})

app.post('/api/todo', (req, res) => {
  const body = req.body
  if (!body || !body.content) {
    res.status(400).json({ error: 'content missing' })
  } else {
    const newTodo = {
      content: body.content
    }
    todoList = todoList.concat(newTodo)
    res.status(201).json(newTodo)
  }
})

app.delete('/api/todo/:id', (req, res) => {
  const id = req.params.id
  todoList = todoList.filter(todo => todo.id !== id)
  res.status(204).end()
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('Server running on port: ', PORT)
