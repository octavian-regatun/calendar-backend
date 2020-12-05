import { Request } from 'express';
import { PassportStatic } from 'passport';
import User from './models/user';
import { IUser } from './models/user';
import { IProfile } from './interfaces/profile';
import GooglePassport, { VerifyCallback } from 'passport-google-oauth2';
import { handleException } from './exceptions';

const GoogleStrategy = GooglePassport.Strategy;

export default function passportInitialize(passport: PassportStatic): void {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/api/auth/google/callback',
        passReqToCallback: true
      },
      (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: IProfile,
        done: VerifyCallback
      ) => {
        // add user to db
        User.findOne({ providerId: profile.id })
          .then((foundUser) => {
            if (foundUser) {
              return done(null, foundUser);
            }
            const newUser = new User();

            newUser.provider = profile.provider;
            newUser.providerId = profile.id;
            newUser.email = profile.email;
            newUser.firstName = profile.name.givenName;
            newUser.lastName = profile.name.familyName;

            newUser
              .save()
              .then((savedUser) => {
                return done(null, savedUser);
              })
              .catch((err) => {
                console.log(err);
                return done(err, null);
              });
          })
          .catch((err) => {
            console.log(err);
            return done(err, null);
          });
      }
    )
  );

  passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        handleException(err);
        done(err, null);
      });
  });
}
