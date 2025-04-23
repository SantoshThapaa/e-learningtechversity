import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    readMoreLink: {
        type: String,
        required: true
    },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
