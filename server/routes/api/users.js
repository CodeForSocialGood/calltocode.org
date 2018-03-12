import expressPromiseRouter from 'express-promise-router'

import auth from '../../lib/middleware/auth'
import _users from '../controllers/users'

const router = expressPromiseRouter()
const users = _users._init()

router.route('/current')
  .get(auth.required, users.getCurrent)
  .put(auth.required, users.putCurrent)

router.route('/')
  .get(auth.optional, users.getUsers)
  .post(auth.optional, users.createUser)

router.route('/login')
  .post(users.login)

router.route('/salt')
  .get(users.getSalt)

router.route('/apply/:projectId')
  .post(auth.required, users.applyForProject)

router.route('/password')
  .post(users.changePassword)

router.route('/password/code')
  .post(users.createCode)

router.route('/password/code/validate')
  .post(users.validateCode)

router.route('/:userId')
  .get(auth.required, users.getUser)
  .put(auth.required, users.putUser)

router.param('userId', users.userById)

export default router
