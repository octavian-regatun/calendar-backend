import express from 'express';
import { ensureAuth } from './../middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Calendar backend server is running`);
});
router.use('/auth', require('./auth/auth'));
router.use('/events', ensureAuth, require('./events/events'));

module.exports = router;
