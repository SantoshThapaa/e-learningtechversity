import express from 'express';
import { createPayment, getPayments } from '../controllers/payment.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();


router.post('/create', isAuth, createPayment);
router.get('/', isAuth, getPayments);

export default router;
