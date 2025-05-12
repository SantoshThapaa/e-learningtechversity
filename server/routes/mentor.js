import express from 'express';
import { addMentor, deleteMentor, getAllMentors, updateMentor } from "../controllers/mentor.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.get('/mentors', getAllMentors);
router.post('/mentor/add', uploadImage, addMentor);
router.put('/mentor/update/:id', uploadImage, updateMentor);
router.delete('/mentor/delete/:id', deleteMentor);

export default router;
