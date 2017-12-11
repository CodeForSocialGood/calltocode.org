const mongoose = require('mongoose')

const ForgotPasswordSchema = mongoose.Schema({
  code: String,
  email: String,
  createdAt: { type: Date, default: Date.now, expires: '1h' }
})

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema)

module.exports = ForgotPassword
