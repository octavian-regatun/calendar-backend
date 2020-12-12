import express from 'express'
import ResponseController from '../controller/ResponseController.js'
import { ensureAuth } from '../middlewares/auth.js'
import routerAuth from './auth'
import routerEvents from './events'

const router = express.Router()

router.get('/', (req, res) => {
  ResponseController.success(res, '<h1>calendar server is running</h1>')
})

router.use('/auth', routerAuth)
router.use('/events', ensureAuth, routerEvents)

export default router
