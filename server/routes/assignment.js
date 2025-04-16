import express from "express";
import { getAssignmentsByCourse, getSubmissionsForAssignment, getTeacherAssignments, postAssignment, submitAssignment } from "../controllers/assignment.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = express.Router();
router.post("/create/:courseId", isAuth, postAssignment);
router.post("/submit/:assignmentId", isAuth, submitAssignment);
router.get("/submissions/:assignmentId", isAuth, getSubmissionsForAssignment);
router.get("/courseassignments", isAuth, getTeacherAssignments);
router.get("/teacher/assignments/course/:courseId",getAssignmentsByCourse);

export default router;
