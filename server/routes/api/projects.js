import expressPromiseRouter from 'express-promise-router'
import multer from 'multer'

import auth from '../../lib/middleware/auth'
import _projects from '../controllers/projects'

const router = expressPromiseRouter()
const projects = _projects._init()
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.route('/')
  .get(auth.optional, projects.getProjects)
  .post(auth.optional, upload.single('picture'), projects.createProject)

router.route('/:projectId')
  .get(auth.optional, projects.getProject)
  .put(auth.optional, projects.putProject)

router.param('projectId', projects.projectById)

export default router
