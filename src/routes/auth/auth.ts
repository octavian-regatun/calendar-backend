import express from 'express';
import passport from 'passport';
import APIResponse from '../../responses';

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
    res.redirect(308, `${process.env.FRONTEND_URL as string}`);
  }
);

router.get('/failed', (req, res) => {
  APIResponse.internalServerError(res);
});

router.get('/logout', (req, res) => {
  req.logOut();
  APIResponse.success(res, 'user logged out');
});

router.get('/loggedIn', (req, res) => {
  if (req.isAuthenticated()) {
    APIResponse.success(res, { loggedIn: true });
  } else {
    APIResponse.success(res, { loggedIn: false });
  }
});

export default router;
