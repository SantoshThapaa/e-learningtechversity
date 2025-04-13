
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: Map,
    of: String,
    required: false,
  },
  subscription: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
}, { _id: false });

export default profileSchema;
