import { Courses } from "../models/Courses.js";
import { User } from "../models/User.js";
import { Payment } from '../models/Payment.js';

export const addCourseToSubscription = async (req, res) => {
  const { userId, courseId, paymentDetails } = req.body;

  try {
    const course = await Courses.findById(courseId); 
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscriptionData = {
      course: courseId,
      courseTitle: course.title,
      courseDescription: course.description,
      paymentStatus: paymentDetails.paymentStatus || 'Pending',
      paymentMethod: paymentDetails.paymentMethod || 'Stripe',
      amount: paymentDetails.amount,
      paymentPlan: paymentDetails.paymentPlan || 'Full Pay',
      paidAt: paymentDetails.paidAt || new Date()
    };

    user.profile.subscription.push(subscriptionData);
    await user.save(); 
    const payment = new Payment({
      userId,
      courseId,
      paymentPlan: paymentDetails.paymentPlan,
      amount: paymentDetails.amount,
      paymentStatus: paymentDetails.paymentStatus,
      paymentMethod: paymentDetails.paymentMethod,
      paymentMethodToken: paymentDetails.paymentMethodToken,
      transactionId: paymentDetails.transactionId,
      paidAt: paymentDetails.paidAt,
      accessGranted: paymentDetails.accessGranted || false,
    });

    await payment.save();

    return res.status(200).json({ message: 'Course added to subscription successfully', user });
  } catch (error) {
    console.error('Error adding course to subscription:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getUserSubscription = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('profile.subscription.course');  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ subscription: user.profile.subscription });
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  const { userId, courseId, newPaymentStatus } = req.body;

  try {
    const user = await User.findById(userId);  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscriptionIndex = user.profile.subscription.findIndex(sub => sub.course.toString() === courseId);
    if (subscriptionIndex === -1) {
      return res.status(404).json({ message: 'Course not found in subscription' });
    }

    user.profile.subscription[subscriptionIndex].paymentStatus = newPaymentStatus;
    await user.save();

    return res.status(200).json({ message: 'Payment status updated successfully', user });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
