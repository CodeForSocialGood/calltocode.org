const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator (email, done) {
        User.find({ email }, (error, docs) => {
          if (error) return console.error(error)
          const userDoesNotExist = docs.length === 0
          done(userDoesNotExist)
        })
      },
      message: 'User already exists!'
    }
  },
  password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
