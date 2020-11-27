import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { dbOptions, mongooseURL } from './config';
import { ensureAuth } from './middlewares/auth';
import path from 'path';

const MongoStore = connectMongo(session);

mongoose
  .connect(mongooseURL, dbOptions)
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log(err);
  });

const app = express();

require('./passport')(passport);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || ''],
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/routes'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(
    express.static(path.join(__dirname, '../../calendar-frontend/build'))
  );

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(
      path.join(__dirname, '../../calendar-frontend/build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Calendar backend server is running on PORT: ${PORT}`);
});
