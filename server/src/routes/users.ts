import express from 'express';
import passport from 'passport';

import UserController from '../controllers/user';

const router = express.Router();

router.post('/', UserController.registerUser);
router.get('/:username', passport.authenticate('jwt', { session: false }), UserController.getUserInfo);
router.patch('/:username', passport.authenticate('jwt', { session: false }), UserController.incrementUserScore);

export default router;
