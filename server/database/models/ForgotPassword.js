import mongoose from 'mongoose'

const ForgotPasswordSchema = mongoose.Schema({
  code: String,
  email: String,
  createdAt: { type: Date, default: Date.now, expires: '1h' }
})

export default mongoose.model('ForgotPassword', ForgotPasswordSchema)
