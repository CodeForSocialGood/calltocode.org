const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { authConfig } = require('../../config')

const UserSchema = mongoose.Schema({
  usertype: {
    type: String,
    enum: ['contact', 'volunteer'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  projectsAppliedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
}, { timestamps: true })

UserSchema.methods.generateSessionToken = function () {
  const today = new Date()
  const expiration = new Date(today)
  const expirationDays = 14
  expiration.setDate(today.getDate() + expirationDays)

  return jwt.sign({
    id: this._id,
    exp: parseInt(expiration.getTime() / 1000)
  }, authConfig.jwtSigningKey)
}

UserSchema.methods.toJSON = function () {
  return {
    token: this.generateSessionToken(),
    id: this._id,
    usertype: this.usertype,
    email: this.email,
    projectsAppliedFor: this.projectsAppliedFor,
    organization: this.organization
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
