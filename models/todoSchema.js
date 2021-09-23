const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  content: String,
  date: Date,
  complete: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

todoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Todo = model('Todo', todoSchema)

module.exports = { Todo }
