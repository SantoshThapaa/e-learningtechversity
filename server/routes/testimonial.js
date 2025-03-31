import express from 'express';
import { createTestimonial, getAllTestimonials } from '../controllers/testimonial.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/createTestimonial', isAuth, createTestimonial);
router.get('/', getAllTestimonials);

export default router;
