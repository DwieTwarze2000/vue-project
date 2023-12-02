import express from 'express';
import { getPhoneCallHistory, addPhoneCall, getTodayPhoneCallAmount } from '../controllers/phoneCallHistory.controller';
import { userAuthorization } from '../../auth/middlewares/userAuth.middlewares';
const router = express.Router();


router.get('/history', userAuthorization, getPhoneCallHistory);
router.get('/todayAmount', getTodayPhoneCallAmount);
router.post('/add', addPhoneCall);
