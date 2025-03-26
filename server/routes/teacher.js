import express from 'express';
import { isAdmin, isAuth, isTeacher } from '../middlewares/isAuth.js';
import { addLectures, createCourse, deleteCourse, deleteLecture, teacherJoinCourse } from '../controllers/teacher.js';
import { uploadFiles } from '../middlewares/multer.js';
import { postAssignment } from '../controllers/assignment.js';
import { getEnrolledStudents } from '../controllers/course.js';

const router = express.Router();

router.post("/course/new", isAuth, isTeacher, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isTeacher, uploadFiles, addLectures);
router.delete("/course/:id", isAuth, isTeacher, deleteCourse);
router.delete("/lecture/:id", isAuth, isTeacher, deleteLecture);
router.post("/course/:courseId/join", isAuth, isTeacher, teacherJoinCourse);
router.post("/course/:courseId/assignment", isAuth, isTeacher, postAssignment);
router.get("/course/:courseId/students", isAuth, isTeacher, getEnrolledStudents);

export default router;