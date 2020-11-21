import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect(308, 'http://me.mydomain.com:3000');
  }
);

router.get('/failed', (req, res) => {
  res.sendStatus(500);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(200).send('logged out');
});

router.get('/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ body: { loggedIn: true } });
  } else {
    res.send({ body: { loggedIn: false } });
  }
});

router.get('/cookie', (req, res) => {
  res.cookie('test', 'testvalue');
  res.send();
});

module.exports = router;
