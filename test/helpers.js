const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialTodos = [
  {
    content: 'Sacar a pasear a el perro'
  },
  {
    content: 'Nota inicial de test 2'
  }
]

const getAllTodos = async () => {
  const response = await api.get('/api/todo')
  return response.body
}

module.exports = {
  initialTodos,
  api,
  getAllTodos
}
