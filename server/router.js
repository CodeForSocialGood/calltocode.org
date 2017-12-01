const express = require('express')
const emailController = require('./controllers/emailController')._init()
const signupController = require('./controllers/signupController')._init()
const indexController = require('./controllers/indexController')._init()
const loginController = require('./controllers/loginController')._init()
const userController = require('./controllers/userController')._init()
const opportunitiesController = require('./controllers/opportunitiesController')._init()

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

// api
router.get('/api/all-opps', opportunitiesController.getAllOpps.bind(opportunitiesController))
router.get('/api/org-opps', opportunitiesController.getOrganizationOpps.bind(opportunitiesController))
router.post('/api/opps', opportunitiesController.getOpps.bind(opportunitiesController))
router.get('/api/opp/:id', opportunitiesController.getOpp.bind(opportunitiesController))
router.get('/api/all-users', userController.getAllUsers.bind(userController))
router.get('/api/user/:id', userController.getUser.bind(userController))

router.post('/login', loginController.login.bind(loginController))
router.post('/email', emailController.sendEmailToOrganization.bind(emailController))
router.post('/signup', signupController.signupNewUser.bind(signupController))
router.get('/', indexController.getIndexPage.bind(indexController))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
