import express from 'express';
import { deleteUserProfile, getLecturesByCourse, loginUser, logoutUser, myProfile, register, updatePassword, updateUserProfile, verifyUser, viewUserProfile } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';
import { uploadProfileFiles } from '../middlewares/multer.js';
import { getCoursesStatus, getUserRegistrationStats } from '../controllers/UserStats.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.put('/update-password', authenticateJWT, updatePassword);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.get("/user/me", isAuth, myProfile);
router.put('/profile', isAuth, uploadProfileFiles, updateUserProfile);
router.get('/user/:userId', viewUserProfile);
router.delete('/user/:userId', deleteUserProfile);
router.get('/lectures/:courseId', isAuth, getLecturesByCourse);
router.get('/stats', getUserRegistrationStats);
router.get('/courses/status', getCoursesStatus);

export default router;