import express from 'express'

import auth from '../../lib/middleware/auth'
import _email from '../controllers/email'

const router = express.Router()
const email = _email._init()

router.route('/')
  .post(auth.required, email.sendToOrg)

export default router
