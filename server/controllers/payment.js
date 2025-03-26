import Stripe from 'stripe';
import { Payment } from '../models/Payment.js';
import { User } from '../models/User.js';


const stripe = Stripe('sk_test_51PB5UvBTLGU4hBnYJhoqozCyCk65JL097Q0PDBRZOYAbymXG4x7StuwzgISeJpFGKiuI0KDFUYW56pS65lOjvBqR00YO0Ff7rU'); 


export const createPayment = async (req, res) => {
    try {
        const { userId, paymentPlan, amount, cardDetails } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const payment = new Payment({
            userId,
            paymentPlan,
            amount,
            cardDetails,
            paymentMethod: 'Stripe'
        });

        await payment.save();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,  
            currency: 'usd',      
            payment_method: cardDetails.cardNumber,
            confirmation_method: 'manual',
            confirm: true
        });

        if (paymentIntent.status === 'succeeded') {
            payment.paymentStatus = 'Completed';
            payment.transactionId = paymentIntent.id;
            await payment.save();
            return res.status(200).json({
                message: 'Payment successful',
                payment
            });
        } else {
            payment.paymentStatus = 'Failed';
            await payment.save();
            return res.status(400).json({
                message: 'Payment failed'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', 'name email'); 
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
