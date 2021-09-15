const mongoose = require('mongoose')
require('dotenv').config()
const error = require('./middleware/logger').error

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // it's deprecated
  useCreateIndex: true
})
  .then(() => {
    console.log('Database Connected')
  })
  .catch(err => error(err))
