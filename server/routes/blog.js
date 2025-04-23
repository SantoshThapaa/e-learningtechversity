import express from "express";

import { createBlog, getAllBlogs, getBlogById } from "../controllers/blog.js";
import { uploadImage } from "../middlewares/multer.js";


const router = express.Router();

router.get("/blogs/all", getAllBlogs);
router.post("/blogs/new",  uploadImage, createBlog);
router.get("/blog/:id", uploadImage, getBlogById);

export default router;


