import { Testimonial } from "../models/testimonial.js";
import { User } from "../models/User.js";

export const createTestimonial = async (req, res) => {
    try {
        const { rating, review, profilePic, role } = req.body;
        console.log(req.body);

        const userId = req.user._id;

        console.log(userId);
        if (!review || !rating || !profilePic) {
            return res.status(400).json({ message: 'Review, rating, and profilePic are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const testimonial = new Testimonial({
            userId,
            name: user.name,
            role: role || user.role,
            review,
            rating,
            profilePic
        });

        await testimonial.save();
        res.status(201).json({
            message: 'Testimonial submitted successfully!',
            testimonial
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().populate(
            'userId',
             'name email role'
            );
        res.status(200).json(testimonials);
    } catch (error) {
        console.error(error);
        res.status(500).json({
             message: 'Server error' 
        });
    }
};
