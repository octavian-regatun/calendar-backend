import passport from 'passport'
import User from '../models/user.js'
import GoogleStrategy from './GoogleStrategy.js'
import { handleException } from '../utils/exceptions.js'

passport.use(GoogleStrategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      handleException(err)
      done(err, null)
    })
})

export default passport
