import express from 'express';
import { deleteUserProfile, editUserProfile, loginUser, logoutUser, myProfile, register, verifyUser, viewUserProfile } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.get("/user/me", isAuth, myProfile);
router.get('/user/:userId', viewUserProfile);  
router.put('/user/:userId', editUserProfile);  
router.delete('/user/:userId', deleteUserProfile);

export default router;