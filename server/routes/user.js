import express from 'express';
import { loginUser, logoutUser, myProfile, register, verifyUser } from '../controllers/user.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);
router.get("/user/me", isAuth, myProfile);

export default router;