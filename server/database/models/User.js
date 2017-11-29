const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  usertype: {
    type: String,
    enum: ['contact', 'volunteer'],
    required: true
  },
  email: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true
  },
  opportunitiesAppliedFor: [mongoose.Schema.Types.ObjectId],
  organization: mongoose.Schema.Types.ObjectId
})

userSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    usertype: this.usertype,
    email: this.email,
    opportunitiesAppliedFor: this.opportunitiesAppliedFor,
    organization: this.organization
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
