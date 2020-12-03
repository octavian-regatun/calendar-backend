import { PassportStatic } from 'passport';
import User from './models/user';
import { IUser } from './models/user';
import { IProfile } from './interfaces/profile';
import { DoneFunction } from './types';

const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        passReqToCallback: true
      },
      async (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: IProfile,
        done: DoneFunction
      ) => {
        // add user to db
        let error = null;

        const foundUser = await User.findOne({ providerId: profile.id })
          .then((user) => user)
          .catch((err) => {
            console.log(err);
            error = err;
          });

        if (foundUser) {
          return done(error, foundUser);
        } else {
          const newUser = new User();

          newUser.provider = profile.provider;
          newUser.providerId = profile.id;
          newUser.email = profile.email;
          newUser.firstName = profile.name.givenName;
          newUser.lastName = profile.name.familyName;

          const savedUser = await newUser
            .save()
            .then((user) => user)
            .catch((err) => {
              console.log(err);
              error = err;
              return null;
            });
          return done(error, savedUser);
        }
      }
    )
  );

  passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
