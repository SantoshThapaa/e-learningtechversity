
import express from 'express';
import { createTestimonial, getAllTestimonials } from '../controllers/testimonial.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.post('/createTestimonial',uploadImage, createTestimonial);
router.get('/allTestimonials', getAllTestimonials);

export default router;
