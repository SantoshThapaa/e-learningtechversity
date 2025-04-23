import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  targetAudience: { type: String, enum: ['all', 'teacher', 'user'], default: 'all' },
  sender: { type: String, default: 'Admin' },
  sendAt: { type: Date, required: true },
  sent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification; 
