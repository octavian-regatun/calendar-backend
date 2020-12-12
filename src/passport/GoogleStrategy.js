import GooglePassport from 'passport-google-oauth2'
import User from '../models/user'

const GoogleStrategy = new GooglePassport.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    // add user to database
    User.findOne({ providerId: profile.id })
      .then((foundUser) => {
        if (foundUser) {
          return done(null, foundUser)
        }
        const newUser = new User()

        newUser.provider = profile.provider
        newUser.providerId = profile.id
        newUser.email = profile.email
        newUser.firstName = profile.name.givenName
        newUser.lastName = profile.name.familyName

        newUser
          .save()
          .then((savedUser) => {
            return done(null, savedUser)
          })
          .catch((err) => {
            console.log(err)
            return done(err, null)
          })
      })
      .catch((err) => {
        console.log(err)
        return done(err, null)
      })
  }
)

export default GoogleStrategy
