import express from 'express';
import { isAdmin, isAuth, isTeacher } from '../middlewares/isAuth.js';
import { addLectures, createCourse } from '../controllers/teacher.js';
import { uploadFiles } from '../middlewares/multer.js';

const router = express.Router();

router.post("/course/new", isAuth, isTeacher, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);

export default router;