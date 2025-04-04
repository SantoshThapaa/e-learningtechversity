import express from 'express';
import { createPayment, getPayments } from '../controllers/payment.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();


router.post('/createPayment', isAuth, createPayment);
router.get('/getPayment', isAuth, getPayments);

export default router;
