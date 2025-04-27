import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    descriptions:{
        type: String,
        required: false,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    feedback: {
        type: String,
        default: '',   
    }
});

export const Submission = mongoose.model("Submission", submissionSchema);
