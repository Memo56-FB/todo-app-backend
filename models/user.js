const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  todos: [{
    type: Schema.Types.ObjectId, // if we put the Type as Object Id we have some advantages
    ref: 'Todo'
  }]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v

    delete ret.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = { User }
