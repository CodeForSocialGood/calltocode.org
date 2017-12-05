const mongoose = require('mongoose')

const ForgotPasswordSchema = mongoose.Schema({
  code: String,
  email: String,
  expireDate: Date
}, { timestamps: true })

const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema)

module.exports = ForgotPassword
