import express from 'express';
import { addTeamMember, deleteTeamMember, getTeamMembers, updateTeamMember } from '../controllers/team.js';
import { uploadImage } from '../middlewares/multer.js';

const router = express.Router();

router.post('/team/add',uploadImage, addTeamMember);
router.put('/team/update/:id',uploadImage, updateTeamMember);
router.get('/team/all', getTeamMembers);
router.delete('/delete/:id', deleteTeamMember);

export default router;
