import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, description, date, readMoreLink } = req.body;
        const parsedDate = new Date(date);

        if (isNaN(parsedDate)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

        const newBlog = new Blog({
            title,
            description,
            date: parsedDate,
            imageUrl,
            readMoreLink
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog)
            return res.status(404).json({
                message: "Blog not found"
            });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
