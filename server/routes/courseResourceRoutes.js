import express from 'express';
import { 
    addSectionOrSubheading,
    deleteSubheading,
    getCourseIdBySectionTitle,
    getCourseResources, 
    updateSectionTitle
    } from '../controllers/courseResourceController.js';


const router = express.Router();

router.post('/:courseId/add', addSectionOrSubheading); 
router.get('/:courseId', getCourseResources);
router.delete('/delete', deleteSubheading);
router.put('/update-title', updateSectionTitle);
router.get('/by-section/:sectionTitle', getCourseIdBySectionTitle);

export default router;
