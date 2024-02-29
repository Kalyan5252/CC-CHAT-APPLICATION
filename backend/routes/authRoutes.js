import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';

const router = express.Router();

// router.get('/login', (req, res) => {
//   res.send('Login Page');
// });

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

export default router;
