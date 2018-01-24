import express from 'express'

import auth from '../../lib/middleware/auth'
import _users from '../controllers/users'

const router = express.Router()
const users = _users._init()

router.route('/current')
  .get(auth.required, users.getCurrent)
  .put(auth.required, users.putCurrent)

router.route('/')
  .get(auth.optional, users.getUsers)
  .post(users.signup)

router.route('/getSalt')
  .get(users.getSalt)

router.route('/login')
  .post(users.login)

router.route('/:user')
  .get(auth.required, users.getUser)
  .put(auth.required, users.putUser)

router.route('/new-password')
  .post(users.changePassword)

export default router
