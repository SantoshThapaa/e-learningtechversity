import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getStudentAttendance, getStudentsByCourse, saveAttendance } from "../controllers/attendance.js";

const router = express.Router();

router.get("/courses/:courseId/students", isAuth, getStudentsByCourse);
router.post("/attendance/:courseId/save", isAuth, saveAttendance);
router.get("/attendance/student", isAuth, getStudentAttendance);

export default router;
