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
    video: {
        type: String,
        required: false,
    },
    videoLink: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
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
