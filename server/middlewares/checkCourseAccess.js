import { Payment } from "../models/Payment.js";

export const checkCourseAccess = async (req, res, next) => {
    const { userId, courseId } = req.body;

    const payment = await Payment.findOne({
        userId,
        courseId,
        paymentStatus: 'Completed',
        accessGranted: true
    });

    if (!payment) {
        return res.status(403).json({ message: 'Access denied. Please complete payment.' });
    }

    next();
};
