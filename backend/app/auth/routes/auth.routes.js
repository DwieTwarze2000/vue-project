import express from 'express';

import { registerController } from '../controllers/register.controller';
import { loginController } from '../controllers/login.controller';
import { logoutController } from '../controllers/logout.controller';
import { userAuthorization } from '../middlewares/userAuth.middlewares';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', userAuthorization, logoutController);

router.get('/user', userAuthorization, getUser);
router.patch('/user', userAuthorization, updateUser);
router.delete('/user', userAuthorization, deleteUser);

export default router;
