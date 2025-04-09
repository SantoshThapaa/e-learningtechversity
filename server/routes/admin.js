import express from 'express';
import { isAdmin, isAuth, isTeacher } from '../middlewares/isAuth.js';
import { assignTeacherToCourse, createCourse, getAllCourses, getAllStats, getAllStudents, getAllTeachers, registerTeacher, Teacherlogin } from '../controllers/admin.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.get("/stats", isAuth, isAdmin, getAllStats);
router.post("/registerteacher", registerTeacher);
router.get("/students", getAllStudents);
router.post("/assign-teacher", assignTeacherToCourse);
router.get('/teachers', getAllTeachers);
router.post('/createnewcourses',uploadImage, createCourse);
router.get('/allcourses', getAllCourses);
router.post("/login", Teacherlogin);
router.post("/assign-teacher",isTeacher, assignTeacherToCourse);

export default router;