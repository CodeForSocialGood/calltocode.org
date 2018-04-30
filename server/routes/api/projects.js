import expressPromiseRouter from 'express-promise-router'
import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

import auth from '../../lib/middleware/auth'
import _projects from '../controllers/projects'

const router = expressPromiseRouter()
const projects = _projects._init()

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS,
  // region: ''
  endpoint: 'http://127.0.0.3:9000',
  signatureVersion: 'v4'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bucket-name',
    key: function (req, file, cb) {
      console.log(file)
      cb(null, Date.now() + file.originalname)
    }
  })
})

router.route('/')
  .get(auth.optional, projects.getProjects)
  .post(auth.optional, upload.single('picture'), projects.createProject)

router.route('/:projectId')
  .get(auth.optional, projects.getProject)
  .put(auth.optional, projects.putProject)

router.param('projectId', projects.projectById)

export default router
