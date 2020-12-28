import express from 'express'
import ResponseController from '../controller/ResponseController.js'
import { ensureAuth } from '../middlewares/auth.js'
import routerAuth from './auth'
import routerEvents from './events'
import routerLocation from './location'

const router = express.Router()

router.get('/', (req, res) => {
  ResponseController.success(res, '<h1>calendar server is running</h1>')
})

router.use('/auth', routerAuth)
router.use('/events', ensureAuth, routerEvents)
router.use('/location', routerLocation)

export default router
