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
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
