import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: Map,
    of: String,
    required: false,
  },
  subscription: [
    {
      course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses', 
        required: true 
      },
      courseTitle: { 
        type: String, 
        required: true 
      },
      courseDescription: {
        type: String,
        required: false
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
      amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be positive']
      },
      paymentPlan: {
        type: String,
        enum: ['Full Pay', 'EMI'],
        required: true,
        trim: true
      },
      paidAt: {
        type: Date,
        default: null
      }
    }
  ]
}, { _id: false });

export default profileSchema;
