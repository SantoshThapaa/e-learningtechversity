import express from 'express';
import { getAllCourses, getSingleCourse,  getMyCourses, getLecturesByCourse, getNewBatchNo, getCoursesByCategory, getAllCategories } from '../controllers/course.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, getLecturesByCourse);
router.get("/mycourse", isAuth, getMyCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/batch/no', getNewBatchNo);
router.get('/categories', getAllCategories);


export default router;