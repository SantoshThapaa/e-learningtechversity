import mongoose from 'mongoose';
import { Courses } from './Courses.js';  // Import the Courses model

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses', 
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

paymentSchema.post('save', async function(doc) {
    if (doc.paymentStatus === 'Completed') {
        try {
            const course = await Courses.findById(doc.courseId); 
            course.enrolledStudents.push(doc.userId);
            await course.save();
            doc.accessGranted = true;
            await doc.save();
        } catch (error) {
            console.error('Error updating course enrollment after payment:', error);
        }
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);
