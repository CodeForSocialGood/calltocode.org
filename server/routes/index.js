import express from 'express'

import api from './api'
import _index from './controllers/index'

const router = express.Router()
const index = _index._init()

router.use('/api', api)
router.get('*', index.getIndexPage)

export default router
