const supertest = require('supertest')
const mongoose = require('mongoose')
const { app } = require('../index')
const { server } = require('../index')
const { Todo } = require('../models/todoSchema')

const api = supertest(app)

const initialTodos = [
  {
    content: 'Nota inicial de test 1'
  },
  {
    content: 'Nota inicial de test 2'
  }
]

beforeEach(async () => {
  await Todo.deleteMany({})
  const todo1 = new Todo(initialTodos[0])
  await todo1.save()

  const todo2 = new Todo(initialTodos[1])
  await todo2.save()
})

test('notes are returned ad json', async () => {
  await api
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
