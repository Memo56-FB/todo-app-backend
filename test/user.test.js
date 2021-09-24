const { User } = require('../models/user')
const { api } = require('./helpers')
const { server } = require('../index')
const { getAllUsers } = require('./helpers')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      username: 'memoRoot',
      name: 'Guillermo',
      passwordHash
    })
    await user.save()
  })
  test('create a new user successful', async () => {
    const usersAtStart = await getAllUsers()
    const newUser = {
      username: 'memo56',
      name: 'Guillermo',
      password: 'gato123'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'memoRoot',
      name: 'Guillermo',
      password: 'ElPasswordMasSeguro'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'Username already taken' })
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = getAllUsers()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
