import cron from 'node-cron';
import Notification from './models/Notification.js';
import { Payment } from './models/Payment.js';
import { User } from './models/User.js';
import sendMail from './middlewares/sendMail.js';  

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

      
      sendMail(note.userEmail, 'Scheduled Notification', {
        message: note.message,
      });
    }

  
    const payments = await Payment.find({ paymentPlan: 'EMI', accessGranted: true });

    for (const payment of payments) {
      const today = new Date();
      const nextPaymentDue = new Date(payment.nextPaymentDue);

      if (today > nextPaymentDue && payment.accessGranted) {
        const user = await User.findById(payment.userId);
        if (user) {
          const notificationMessage = `Your EMI payment is due. Please make the payment to retain access to your course.`;
          const notification = new Notification({
            userEmail: user.email,  
            message: notificationMessage,
            sendAt: new Date(),  
          });

          await notification.save();
          sendMail(user.email, 'EMI Payment Reminder', {
            name: user.name,
            message: notificationMessage,
          });
        }
        payment.accessGranted = false;
        await payment.save();
      }
    }
  });
};
