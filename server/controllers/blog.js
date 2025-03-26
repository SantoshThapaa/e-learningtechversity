import Blog from "../models/Blog.jss";

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
        const { title,
            description,
            date,
            imageUrl,
            readMoreLink
        }
            = req.body;
        const newBlog = new Blog({
            title,
            description,
            date,
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
