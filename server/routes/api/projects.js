const router = require('express').Router()

const auth = require('../auth')
const projectsController = require('../controllers/projectsController')._init()

router.param('project', projectsController.preloadProject.bind(projectsController))

router.get('/', auth.optional, projectsController.getProjects.bind(projectsController))
router.get('/:project', auth.optional, projectsController.getProject.bind(projectsController))

module.exports = router
