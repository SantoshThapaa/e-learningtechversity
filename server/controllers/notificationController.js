import Notification from "../models/Notification.js";
import { User } from "../models/User.js"; 

export const sendNotification = async (req, res) => {
  const { message, sendAt, sender = 'Admin', targetAudience = 'all' } = req.body;

  if (!message || !sendAt) {
    return res.status(400).json({ error: 'Message and sendAt time are required' });
  }

  const sendAtDate = new Date(sendAt);
  if (isNaN(sendAtDate.getTime())) {
    return res.status(400).json({ error: 'Invalid sendAt time' });
  }

  const validAudiences = ['all', 'teacher', 'user'];  
  if (!validAudiences.includes(targetAudience)) {
    return res.status(400).json({ error: 'Invalid target audience' });
  }

  try {
    let users = [];
    switch (targetAudience) {
      case 'all':
        users = await User.find();
        break;
      case 'teachers':
      case 'teacher':
        users = await User.find({ role: 'teacher' });
        break;
      case 'user': 
        users = await User.find({ role: 'user' }); 
        break;
    }

    if (!users.length) {
      return res.status(404).json({ error: 'No users found for the target audience' });
    }

    const newNotification = new Notification({
      message,
      sender,
      sendAt: sendAtDate,
      targetAudience,
      users: users.map(user => user._id),
      sent: false,
    });

    await newNotification.save();
    res.status(201).json({ success: true, message: 'Notification scheduled successfully' });
  } catch (err) {
    console.error("Error scheduling notification:", err);
    res.status(500).json({ success: false, error: 'Failed to schedule notification' });
  }
};

export const getNotificationsForUser = async (req, res) => {
  const { role } = req.params;

  const validRoles = ['teacher', 'user']; 
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    console.log("Role received:", role); 

    const notifications = await Notification.find({
      sent: true,
      $or: [
        { targetAudience: 'all' },
        { targetAudience: role },  
      ],
    }).sort({ sendAt: -1 });



    if (notifications.length === 0) {
      return res.status(200).json([]);  
    }

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
};
