import express from 'express';
import { createPayment, getPayments } from '../controllers/payment.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/createpayments', isAuth, createPayment);
router.get('/getallpayments', isAuth, isAdmin, getPayments);

export default router;
