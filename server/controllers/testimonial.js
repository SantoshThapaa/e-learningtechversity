import { Testimonial } from "../models/testimonial.js";
import { User } from "../models/User.js";

export const createTestimonial = async (req, res) => {
  try {
    const { review, rating, role, name } = req.body;
    const profilePic = req.file ? req.file.path : '';

    if (!review || !rating || !profilePic) {
      return res.status(400).json({ message: 'Review, rating, and profilePic are required.' });
    }

    const testimonial = new Testimonial({
      name: name || 'User',
      role: role || 'Student',
      review,
      rating,
      profilePic,
    });

    await testimonial.save();

    res.status(201).json({
      message: 'Testimonial submitted successfully!',
      testimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }); 
    res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { testimonialId } = req.params;
    await Testimonial.findByIdAndDelete(testimonialId);
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ message: 'Error deleting testimonial' });
  }
};

export const editTestimonial = async (req, res) => {
  try {
    const { testimonialId } = req.params;
    const { review, rating, name, role } = req.body;
    const profilePic = req.file ? req.file.path : '';

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { review, rating, name, role, profilePic },
      { new: true }
    );

    res.status(200).json({
      message: 'Testimonial updated successfully!',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating testimonial' });
  }
};



