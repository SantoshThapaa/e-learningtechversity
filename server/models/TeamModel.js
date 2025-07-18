import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  facebook: { type: String, default: null },
  linkedin: { type: String, default: null },
  twitter: { type: String, default: null },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
