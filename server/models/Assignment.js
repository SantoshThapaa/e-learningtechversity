// models/Assignment.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    taskNumber: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    deadline: {
        type: Date,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);
