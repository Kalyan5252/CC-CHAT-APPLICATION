import express from 'express';
import { loggedIn } from '../controllers/authController.js';
import {
  getUsers,
  uploadPic,
  resizeUserPhoto,
} from './../controllers/userController.js';

const router = express.Router();
router.use(loggedIn);

router.get('/', getUsers);
router.post('/upload', uploadPic, resizeUserPhoto);

export default router;
