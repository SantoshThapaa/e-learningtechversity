import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
   name: {
        required: false,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    confirmPassword:{
        required: false,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    bio: {
        required: false,
        type: String
    },
    socialMedia: {
        type: Map,
        of: String,
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