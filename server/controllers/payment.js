import Stripe from 'stripe';
import { Payment } from '../models/Payment.js';
import { User } from '../models/User.js';
import { Courses } from '../models/Courses.js';
import { stripe_key } from '../config/config.js';
import sendMail from '../middlewares/sendMail.js';
import TryCatch from '../middlewares/TryCatch.js';

const stripe = new Stripe(stripe_key);

export const createPayment = async (req, res) => {
    try {
        const { userId, paymentPlan, amount, paymentMethodToken, courseId } = req.body;

        if (!userId || !paymentPlan || !amount || !paymentMethodToken || !courseId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!['Full Pay', 'EMI'].includes(paymentPlan)) {
            return res.status(400).json({ message: 'Invalid payment plan' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const payment = new Payment({
            userId,
            courseId,
            paymentPlan,
            amount,
            paymentMethod: 'Stripe',
            paymentMethodToken,
            accessGranted: false,
        });

        await payment.save();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            payment_method: paymentMethodToken,
            confirmation_method: 'manual',
            confirm: true,
            payment_method_types: ['card']
        });

        if (paymentIntent.status === 'succeeded') {
            payment.paymentStatus = 'Completed';
            payment.transactionId = paymentIntent.id;
            payment.paidAt = new Date();

            if (paymentPlan === 'EMI') {
                payment.nextPaymentDue = new Date();
                payment.nextPaymentDue.setMonth(payment.nextPaymentDue.getMonth() + 1);
                sendMail(user.email, 'EMI Payment Reminder', {
                    name: user.name,
                    nextPaymentDate: payment.nextPaymentDue.toLocaleDateString(),
                });
            }

            payment.accessGranted = true;
            await payment.save();
            const course = await Courses.findById(courseId);
            if (course) {
                course.enrolledStudents.push(userId);
                await course.save();
            }

            return res.status(200).json({
                message: 'Payment successful and user enrolled in course',
                payment
            });
        } else if (paymentIntent.status === 'requires_action') {
            return res.status(202).json({
                message: 'Further action required',
                clientSecret: paymentIntent.client_secret
            });
        } else {
            payment.paymentStatus = 'Failed';
            await payment.save();

            return res.status(402).json({
                message: 'Payment failed',
                status: paymentIntent.status
            });
        }
    } catch (error) {
        console.error('Payment error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getEmiPayments = TryCatch(async (req, res) => {
    try {
        const emiPayments = await Payment.find({ paymentPlan: 'EMI' })
            .populate('userId', 'name email')
            .populate('courseId', 'title description batchNo')
            .sort({ createdAt: -1 });

        if (!emiPayments || emiPayments.length === 0) {
            return res.status(404).json({ message: 'No EMI payments found.' });
        }

        res.status(200).json(emiPayments);
    } catch (error) {
        console.error('Error fetching EMI payments:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export const getFullPayPayments = TryCatch(async (req, res) => {
    try {
        const fullPayPayments = await Payment.find({ paymentPlan: 'Full Pay' })
            .populate('userId', 'name email')
            .populate('courseId', 'title description batchNo')
            .sort({ createdAt: -1 });

        if (!fullPayPayments || fullPayPayments.length === 0) {
            return res.status(404).json({ message: 'No Full Pay payments found.' });
        }

        res.status(200).json(fullPayPayments);
    } catch (error) {
        console.error('Error fetching Full Pay payments:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export const getUserPayments = TryCatch(async (req, res) => {
    const { paymentPlan } = req.query;
    if (!['Full Pay', 'EMI'].includes(paymentPlan)) {
        return res.status(400).json({ message: 'Invalid payment plan. Please specify either "Full Pay" or "EMI".' });
    }

    const payments = await Payment.find({ userId: req.params.userId, paymentPlan: paymentPlan })
        .populate('courseId', 'title')
        .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
        return res.status(404).json({ message: `No ${paymentPlan} payments found for this user.` });
    }

    res.status(200).json(payments);
});

export const getPayments = TryCatch(async (req, res) => {
    const { paymentPlan } = req.query;
    if (paymentPlan && !['Full Pay', 'EMI'].includes(paymentPlan)) {
        return res.status(400).json({ message: 'Invalid payment plan. Please specify either "Full Pay" or "EMI".' });
    }
    const query = paymentPlan ? { paymentPlan: paymentPlan } : {};

    const payments = await Payment.find(query)
        .populate('userId', 'name email')
        .populate('courseId', 'title description')
        .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
        return res.status(404).json({ message: `No payments found for the "${paymentPlan}" plan.` });
    }

    res.status(200).json(payments);
});

export const deleteEmiPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await Payment.findByIdAndDelete(paymentId);

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting EMI payment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};