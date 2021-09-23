const mongoose = require('mongoose')
const { server } = require('../index')
const { Todo } = require('../models/todoSchema')
const { initialTodos } = require('./helpers')
const { api } = require('./helpers')

beforeEach(async () => {
  await Todo.deleteMany({})

  for (const todo of initialTodos) {
    const todoObj = new Todo(todo)
    await todoObj.save()
  }
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
test('post a todo', async () => {
  const newTodo = {
    content: 'Salir por unas papas'
  }
  await api
    .post('/api/todo')
    .send(newTodo)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/todo')
  expect(response.body).toHaveLength(initialTodos.length + 1)
})
test('delete a todo', async () => {
  const response = await api.get('/api/todo')
  const todoToDelete = response.body[0].id
  await api
    .delete(`/api/todo/${todoToDelete}`)
    .expect(204)
})
test('delete a todo with malformatted id', async () => {
  await api
    .delete('/api/todo/1244')
    .expect(400, { error: 'malformatted id' })// can be a regex too
})
afterAll(() => {
  server.close()
  mongoose.connection.close()
})
