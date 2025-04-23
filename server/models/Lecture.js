import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    meetLink: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    courseDuration: {
        type: String,
        required: false,
    },
    courseTime: {
        type: String,
        required: true,
    },
    hashtags: {
        type: String,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Lecture = mongoose.model("Lecture", schema);
