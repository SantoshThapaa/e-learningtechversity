import express from 'express';
import {
  sendNotification,
  getNotificationsForUser,
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/notifications', sendNotification); 
router.get('/notifications/user/:role', getNotificationsForUser);

export default router;
