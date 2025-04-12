import Stripe from 'stripe';
import { Payment } from '../models/Payment.js';
import { User } from '../models/User.js';
import { stripe_key } from '../config/config.js';

const stripe = new Stripe(stripe_key);

export const createPayment = async (req, res) => {
    try {
        const { userId, paymentPlan, amount, paymentMethodToken } = req.body;
        if (!userId || !paymentPlan || !amount || !paymentMethodToken) {
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
            paymentPlan,
            amount,
            paymentMethod: 'Stripe',
            paymentMethodToken
        });

        await payment.save();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // cents
            currency: 'usd',
            payment_method: paymentMethodToken,
            confirmation_method: 'manual',
            confirm: true,
            payment_method_types: ['card']
        });

        if (paymentIntent.status === 'succeeded') {
            payment.paymentStatus = 'Completed';
            payment.transactionId = paymentIntent.id;
            await payment.save();

            return res.status(200).json({
                message: 'Payment successful',
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

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', 'name email');
        return res.status(200).json(payments);
    } catch (error) {
        console.error('Get payments error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
