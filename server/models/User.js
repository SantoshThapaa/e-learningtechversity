import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    subscription: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
}, { _id: false });

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
}, {
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);
