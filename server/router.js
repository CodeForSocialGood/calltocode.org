const express = require('express')
const setupController = require('./controllers/setupController')._init()
const emailController = require('./controllers/emailController')._init()
const signupController = require('./controllers/signupController')._init()
const indexController = require('./controllers/indexController')._init()
const loginController = require('./controllers/loginController')._init()

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

router.post('/login', loginController.login.bind(loginController))
router.post('/email', emailController.sendEmailToOrganization.bind(emailController))
router.post('/signup', signupController.signupNewUser.bind(signupController))
router.get('/setup', setupController.setupDatabase.bind(setupController))
router.get('/user/:id', setupController.setupDatabase.bind(setupController))
router.get('/', indexController.getIndexPage.bind(indexController))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
