import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import { loggedIn, protect } from '../controllers/authController.js';

const router = express.Router();

router.use(loggedIn);
// router.use(protect);
router.get('/:id', getMessages);
router.post('/send/:id', sendMessage);

export default router;
