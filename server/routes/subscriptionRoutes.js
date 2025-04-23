import express from 'express';
import { addCourseToSubscription, getUserSubscription, updatePaymentStatus } from '../controllers/subscriptionController.js';

const router = express.Router();

router.post('/add-course', addCourseToSubscription);
router.get('/subscription/:userId', getUserSubscription);
router.put('/update-payment-status', updatePaymentStatus);

export default router;
