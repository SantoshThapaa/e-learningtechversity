import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    role: {
        required: true,
        default: "user",
        type: String
    },
    bio: {
        required: false,
        type: String
    },
    socialMedia: {
        required: false,
        type: Object
    },

    profilePicture: {
        required: false,
        type: String
    },
    subscription: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
    ]
 },{
    timestamps: true,
},
);
export const User = mongoose.models.User ?? mongoose.model("User", userSchema);