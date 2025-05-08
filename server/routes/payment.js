import express from 'express';
import { createPayment, deleteEmiPayment, getEmiPayments, getFullPayPayments, getPayments, getUserPayments } from '../controllers/payment.js';
import { isAuth, isAdmin } from '../middlewares/isAuth.js';
import { checkCourseAccess } from '../middlewares/checkCourseAccess.js';

const router = express.Router();

router.post('/createpayments', isAuth, createPayment);
router.get('/getallpayments', isAuth, isAdmin, getPayments);
router.get('/user/:userId', isAuth, getUserPayments);
router.get('/emi', isAuth, getEmiPayments); 
router.delete('/emi/:paymentId', deleteEmiPayment);
router.get('/full-pay', isAuth, getFullPayPayments);
router.post('/check-access', isAuth, checkCourseAccess, (req, res) => {
    res.status(200).json({ message: 'Access granted' });
});

export default router;
