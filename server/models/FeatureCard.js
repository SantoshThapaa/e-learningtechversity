import mongoose from 'mongoose';

const featureCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const FeatureCard = mongoose.model('FeatureCard', featureCardSchema);

export default FeatureCard;
