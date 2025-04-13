import mongoose from 'mongoose';

export const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference your course model
        required: true
    },
    paymentPlan: {
        type: String,
        enum: ['Full Pay', 'EMI'],
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
        trim: true
    },
    paymentMethod: {
        type: String,
        enum: ['Stripe'],
        required: true,
        trim: true
    },
    paymentMethodToken: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        default: null
    },
    paidAt: {
        type: Date,
        default: null
    },
    accessGranted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);
