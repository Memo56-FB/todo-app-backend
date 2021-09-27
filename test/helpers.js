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

module.exports = {
  initialTodos,
  api,
  getAllTodos,
  getAllUsers,
  getUser
}
