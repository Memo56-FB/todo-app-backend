const supertest = require('supertest')
const { app } = require('../index')
const { User } = require('../models/user')
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

const getAllUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

const getUser = async () => {
  const response = await api.get('/api/users')
  return response.body[0]
}

const getToken = async () => {
  const aut = await api.post('/api/login').send({ username: 'memoRoot', password: 'password' })
  return aut.body.token
}

module.exports = {
  initialTodos,
  api,
  getAllTodos,
  getAllUsers,
  getUser,
  getToken
}
