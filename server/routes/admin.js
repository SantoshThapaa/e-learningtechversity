import express from 'express';
import { isAdmin, isAuth, isTeacher } from '../middlewares/isAuth.js';
import { adminLogin, assignTeacherToCourse, createCourse, getAllAdmins, getAllCourses, getAllStats, getAllStudents, getAllTeachers, getTeacherById, registerAdmin, registerTeacher, Teacherlogin } from '../controllers/admin.js';
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
router.get('/teachers/:id', getTeacherById);
router.post('/adminregister', registerAdmin);
router.post('/adminlogin', adminLogin);
router.get('/admins', getAllAdmins);

export default router;