import express from "express";

import { isAdmin } from "../middlewares/isAuth.js";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdmin, getAllMessages);

export default router;