import express from "express";
import { uploadDocument } from '../middlewares/multer.js'; 
import { checkStatus, getAllAssignments, getAssignmentsByCourse, getSubmissionsForAssignment, getSubmissionStatus, getTeacherAssignments, postAssignment, submitAssignment, updateSubmissionStatus } from "../controllers/assignment.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = express.Router();
router.post("/create/:courseId", isAuth, postAssignment);
router.post("/submit/:assignmentId", isAuth, uploadDocument, submitAssignment);
router.get("/submissions/:assignmentId", isAuth, getSubmissionsForAssignment);
router.get("/courseassignments", isAuth, getTeacherAssignments);
router.get("/teacher/assignments/course/:courseId",getAssignmentsByCourse);
router.get("/assignments", getAllAssignments);
router.get('/status/:assignmentId', isAuth, checkStatus);
router.get('/assignment/status/:assignmentId', isAuth, getSubmissionStatus);
router.post('/assignment/status/update/:assignmentId', isAuth, updateSubmissionStatus);

export default router;
