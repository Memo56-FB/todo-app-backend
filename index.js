// const http = require('http')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()

const notFound = require('./middleware/404').notFound
const requestLogger = require('./middleware/requestLogger').requestLogger

app.use(express.json()) // De esta forma se puede leer el body del post
app.use(requestLogger)
const todoList = [
  {
    id: uuidv4(),
    content: 'Sacar al perro'
  },
  {
    id: uuidv4(),
    content: 'Cortar la leña'
  },
  {
    id: uuidv4(),
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
      id: uuidv4(),
      content: body.content
    }
    todoList.push(newTodo)
    res.status(201).json(todoList)
  }
})

app.use(notFound)

const PORT = 3001
app.listen(PORT)
console.log('Server running on port: ', PORT)
