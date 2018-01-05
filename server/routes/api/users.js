const router = require('express').Router()

const auth = require('../../middleware/auth')
const usersController = require('../controllers/usersController')._init()

router.route('/current')
  .get(auth.required, usersController.getCurrent)
  .put(auth.required, usersController.putCurrent)

router.route('/')
  .get(auth.optional, usersController.getUsers)
  .post(usersController.signup)

router.route('/getSalt')
  .get(usersController.getSalt)

router.route('/login')
  .post(usersController.login)

router.route('/:user')
  .get(auth.required, usersController.getUser)
  .put(auth.required, usersController.putUser)

router.route('/new-password')
  .post(usersController.changePassword)

module.exports = router
