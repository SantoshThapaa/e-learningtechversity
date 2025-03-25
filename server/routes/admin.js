import express from 'express';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { getAllStats } from '../controllers/admin.js';

const router = express.Router();

router.get("/stats", isAuth, isAdmin, getAllStats);

export default router;