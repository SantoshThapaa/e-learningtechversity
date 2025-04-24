
import express from 'express';
import { createTestimonial, deleteTestimonial, editTestimonial, getAllTestimonials } from '../controllers/testimonial.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.post('/createTestimonial',uploadImage, createTestimonial);
router.get('/allTestimonials', getAllTestimonials);
router.put('/editTestimonial/:testimonialId', uploadImage, editTestimonial);
router.delete('/deleteTestimonial/:testimonialId', deleteTestimonial);

export default router;
