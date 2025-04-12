import express from 'express';
import { deleteUserProfile, getLecturesByCourse, loginUser, logoutUser, myProfile, register, updateUserProfile, verifyUser, viewUserProfile } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.get("/user/me", isAuth, myProfile);
router.put('/profile', isAuth, uploadImage, updateUserProfile);
router.get('/user/:userId', viewUserProfile);
router.delete('/user/:userId', deleteUserProfile);
router.get('/lectures/:courseId', isAuth, getLecturesByCourse);


export default router;