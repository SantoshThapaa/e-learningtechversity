import express from 'express'; 
import { addLogo, deleteLogo, getAllLogos } from '../controllers/logo.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.post('/logo/add', uploadImage, addLogo);
router.get('/logos', getAllLogos);
router.delete('/logo/delete/:id', deleteLogo);

export default router;
