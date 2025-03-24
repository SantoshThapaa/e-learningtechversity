import express from 'express';
import { isAuth, isTeacher } from '../middlewares/isAuth.js';
import { createCourse } from '../controllers/teacher.js';
import { uploadFiles } from '../middlewares/multer.js';

const router = express.Router();

router.get("/course/new", isAuth, isTeacher, uploadFiles, createCourse);

export default router;