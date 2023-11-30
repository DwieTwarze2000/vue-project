import express from 'express';

import { registerController } from '../controllers/register.controller';
import { loginController } from '../controllers/login.controller';
import { logoutController } from '../controllers/logout.controller';
import { userAuthorization } from '../middlewares/userAuth.middlewares';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', userAuthorization, logoutController);

export default router;
