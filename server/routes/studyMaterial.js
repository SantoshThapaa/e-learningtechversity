import express from 'express';
import { uploadDocument } from '../middlewares/multer.js'; 
import { uploadStudyMaterial, getStudyMaterialsByTeacher, deleteStudyMaterials, getStudyMaterialsByCourse } from '../controllers/studyMaterialController.js';

const router = express.Router();

router.post('/upload', uploadDocument, uploadStudyMaterial); 
router.get("/course/:courseId", getStudyMaterialsByCourse);
router.get("/teacher/:uploaderId", getStudyMaterialsByTeacher);    
router.delete("/delete", deleteStudyMaterials);               

export default router;
