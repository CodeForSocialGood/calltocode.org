import express from 'express'

import auth from '../../lib/middleware/auth'
import _forgotPassword from '../controllers/forgotPasswordController'

const router = express.Router()
const forgotPassword = _forgotPassword._init()

router.route('/')
  .post(auth.optional, forgotPassword.sendVerificationCodeEmail)

router.route('/code')
  .post(forgotPassword.validateCode)

export default router
