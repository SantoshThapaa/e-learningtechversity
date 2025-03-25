import express from 'express';
import { createTestimonial, getAllTestimonials } from '../controllers/testimonial.js';

const router = express.Router();

router.post('/', createTestimonial);
router.get('/', getAllTestimonials);

export default router;
