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

module.exports = {
  initialTodos,
  api
}
