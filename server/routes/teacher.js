import express from 'express';
import { isAuth, isTeacher } from '../middlewares/isAuth.js';
import { createLecture, deleteLecture, getAssignedCourses} from '../controllers/teacher.js';
import { uploadCourseFiles } from '../middlewares/multer.js';
import { postAssignment } from '../controllers/assignment.js';
import { getEnrolledStudents } from '../controllers/course.js';

const router = express.Router();

router.post("/course/:courseId/lecture", isAuth, isTeacher, uploadCourseFiles, createLecture);
router.delete("/lecture/:id", isAuth, isTeacher, deleteLecture);
router.post("/course/:courseId/assignment", isAuth, isTeacher, postAssignment);
router.get("/course/:courseId/students", isAuth, isTeacher, getEnrolledStudents);
router.get("/assigned-courses/:teacherId", getAssignedCourses);

export default router;