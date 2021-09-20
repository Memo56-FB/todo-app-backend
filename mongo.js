const mongoose = require('mongoose')
require('dotenv').config()
const error = require('./middleware/logger').error

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI_TEST
  : MONGODB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // it's deprecated
  useCreateIndex: true
})
  .then(() => {
    console.log('Database Connected')
  })
  .catch(err => error(err))
