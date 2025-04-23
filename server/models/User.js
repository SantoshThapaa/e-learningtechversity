import mongoose from 'mongoose';
import profileSchema from './Profile.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "teacher", "admin"],
        default: "user",
    },
    isApprovedByAdmin: {
        type: Boolean,
        default: false,
    },
    socialMedia: {
        type: Map,
        of: String,
    },
    profile: profileSchema,
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',  
    }],
}, {
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);
