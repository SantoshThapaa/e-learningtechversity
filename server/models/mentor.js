import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
