import express from 'express';
import { ensureAuth } from './../middlewares/auth';
import routerAuth from './auth/auth';
import routerEvents from './events/events';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Calendar backend server is running`);
});
router.use('/auth', routerAuth);
router.use('/events', ensureAuth, routerEvents);

export default router;
