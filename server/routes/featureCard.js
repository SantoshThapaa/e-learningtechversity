import express from 'express';
import { addFeatureCard, deleteFeatureCard, getAllFeatureCards, updateFeatureCard } from '../controllers/featureCard.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.get('/feature-cards', getAllFeatureCards);
router.post('/feature-card/add', uploadImage, addFeatureCard);
router.put('/feature-card/update/:id', uploadImage, updateFeatureCard);
router.delete('/feature-card/delete/:id', deleteFeatureCard);

export default router;
