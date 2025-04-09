import express from 'express';
import { deleteResource, getCourseResources, uploadResource } from "../controllers/resource.js";
import { isAuth } from "../middlewares/isAuth.js";
import { uploadDocument } from '../middlewares/multer.js';


const router = express.Router();

router.post("/course/:courseId/resource", uploadDocument, isAuth, uploadResource);
router.get("/course/:courseId/resources", isAuth, getCourseResources);
router.delete("/resource/:id", isAuth, deleteResource);

export default router;
