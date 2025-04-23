import cron from 'node-cron';
import Notification from './models/Notification.js';

export const startNotificationScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    const dueNotifications = await Notification.find({
      sent: false,
      sendAt: { $lte: now },
    });

    for (const note of dueNotifications) {
      console.log(`Sending scheduled notification: ${note.message}`);

      note.sent = true;
      await note.save();
    }
  });
};
