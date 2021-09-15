const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  content: String,
  date: Date,
  complete: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }
