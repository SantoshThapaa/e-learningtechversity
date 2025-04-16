import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    profilePic: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Testimonial = mongoose.models.Testimonial ?? mongoose.model("Testimonial", testimonialSchema);
