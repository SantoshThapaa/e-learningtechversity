import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    paymentPlan: {
        type: String,
        enum: ['Full Pay', 'EMI'],  
        required: true
    },
    amount: {
        type: Number,
        required: true  
    },
    cardDetails: {
        cardNumber: {
            type: String,
            required: true
        },
        expiry: {
            type: String,  
            required: true
        },
        cvc: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Stripe'],  
        required: true
    },
    transactionId: {
        type: String,  
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);

