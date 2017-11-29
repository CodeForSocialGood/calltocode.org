const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secret = require('../../config').secret

const UserSchema = mongoose.Schema({
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
}, { timestamps: true })

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const expiration = new Date(today)
  const expirationDays = 14
  expiration.setDate(today.getDate() + expirationDays)

  return jwt.sign({
    id: this._id,
    exp: parseInt(expiration.getTime() / 1000)
  }, secret)
}

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    usertype: this.usertype,
    email: this.email,
    opportunitiesAppliedFor: this.opportunitiesAppliedFor,
    organization: this.organization
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
