const express = require('express')
const emailController = require('./controllers/emailController')._init()
const signupController = require('./controllers/signupController')._init()
const indexController = require('./controllers/indexController')._init()
const loginController = require('./controllers/loginController')._init()
const userController = require('./controllers/userController')._init()
const forgotPasswordController = require('./controllers/forgotPasswordController')._init()
const opportunitiesController = require('./controllers/opportunitiesController')._init()
const auth = require('./auth')

const router = express.Router()
router.use(log)

router.get('/all-opps', opportunitiesController.getAllOpps.bind(opportunitiesController))
router.get('/org-opps', opportunitiesController.getOrganizationOpps.bind(opportunitiesController))
router.post('/opps', opportunitiesController.getOpps.bind(opportunitiesController))
router.get('/opp/:id', opportunitiesController.getOpp.bind(opportunitiesController))
router.get('/all-users', userController.getAllUsers.bind(userController))
router.get('/user', auth.required, userController.getUser.bind(userController))
router.post('/user', userController.updateUser.bind(userController))
router.post('/login', loginController.login.bind(loginController))
router.post('/email', emailController.sendEmailToOrganization.bind(emailController))
router.post('/forgot-password', forgotPasswordController.sendVerificationCodeEmail.bind(forgotPasswordController))
router.post('/signup', signupController.signupNewUser.bind(signupController))
router.get('/', indexController.getIndexPage.bind(indexController))
router.get('*', indexController.getIndexPage.bind(indexController))

function log (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
}

module.exports = router
