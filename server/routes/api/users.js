const router = require('express').Router()

const auth = require('../auth')
const usersController = require('../controllers/usersController')._init()

router.param('user', usersController.preloadUser.bind(usersController))

router.get('/', auth.optional, usersController.getUsers.bind(usersController))
router.get('/:user', auth.optional, usersController.getUser.bind(usersController))

router.post('/', usersController.signup.bind(usersController))
router.post('/login', usersController.login.bind(usersController))

router.put('/:user', auth.required, usersController.updateUser.bind(usersController))

module.exports = router
