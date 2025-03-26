const express = require("express");
const { getAllBlogs, createBlog, getBlogById } = require("../controllers/blog.js");
const { isAdmin, isAuth } = require("../middlewares/isAuth.js");
const { uploadFiles } = require("../middlewares/multer.js");

const router = express.Router();

router.get("/blog/all", getAllBlogs);
router.get("/blog/new", isAuth, isAdmin, uploadFiles, createBlog);
router.get("/blog/:id", isAuth, uploadFiles, getBlogById);

module.exports = router;

