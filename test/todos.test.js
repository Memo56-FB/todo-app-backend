const supertest = require('supertest')
const mongoose = require('mongoose')
const { app } = require('../index')
const { server } = require('../index')
const { Todo } = require('../models/todoSchema')

const api = supertest(app)

const initialTodos = [
  {
    content: 'Sacar a pasear a el perro'
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

test('todos are returned ad json', async () => {
  await api
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two todos', async () => {
  const response = await api.get('/api/todo')
  expect(response.body).toHaveLength(initialTodos.length)
})
test('there first todo is about pets', async () => {
  const response = await api.get('/api/todo')
  expect(response.body[0].content).toBe('Sacar a pasear a el perro')
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
