import express from 'express'
import ResponseController from '../controller/ResponseController.js'
import passport from '../passport/passport.js'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect(308, `${process.env.FRONTEND_URL}`)
  }
)

router.get('/failed', (req, res) => {
  ResponseController.internalServerError(res)
})

router.get('/logout', (req, res) => {
  req.logOut()
  ResponseController.success(res, 'user logged out')
})

router.get('/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    ResponseController.success(res, { loggedIn: true })
  } else {
    ResponseController.success(res, { loggedIn: false })
  }
})

export default router
