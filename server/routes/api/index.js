import express from 'express'

import emailRoutes from './email'
import forgotPasswordRoutes from './forgotPassword'
import projectsRoutes from './projects'
import usersRoutes from './users'

const router = express.Router()

router.use('/email', emailRoutes)
router.use('/forgot-password', forgotPasswordRoutes)
router.use('/projects', projectsRoutes)
router.use('/users', usersRoutes)

export default router
