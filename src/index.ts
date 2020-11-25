import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { dbOptions, mongooseURL } from './config';
import { ensureAuth } from './middlewares/auth';

const MongoStore = connectMongo(session);

mongoose
  .connect(mongooseURL, dbOptions)
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app);

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

app.use('/auth', require('./routes/auth/index'));
app.use('/events', ensureAuth, require('./routes/events/index'));

app.get('/', (req, res) => {
  res.send(`Calendar backend server is running`);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Calendar backend server is running on PORT: ${PORT}`);
});
