import express from 'express'

import applicationsRoutes from './applications'
import projectsRoutes from './projects'
import usersRoutes from './users'
import { simulateDelay, simulateError } from '../../lib/simulate'

const router = express.Router()

// Add a simulated delay (ms) or error chance (%) to api requests
const API_REQUEST_DELAY = 0
const API_REQUEST_ERROR_CHANCE = 0

router.use(simulateDelay(API_REQUEST_DELAY))
router.use(simulateError(API_REQUEST_ERROR_CHANCE))

router.use('/applications', applicationsRoutes)
router.use('/projects', projectsRoutes)
router.use('/users', usersRoutes)

export default router
