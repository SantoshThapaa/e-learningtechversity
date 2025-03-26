import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Resource = mongoose.model("Resource", resourceSchema);
