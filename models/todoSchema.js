const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  content: String,
  date: Date,
  complete: Boolean
})

todoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }
