import Mentor from '../models/mentor.js';
import TryCatch from '../middlewares/TryCatch.js';

// **Add Mentor**
export const addMentor = TryCatch(async (req, res) => {
  const { title, number, description, instructor } = req.body;
  const image = req.file?.path;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  const mentor = new Mentor({
    title,
    number,
    description,
    instructor,
    image,
  });

  await mentor.save();

  return res.status(201).json({
    message: "Mentor added successfully",
    mentor,
  });
});

// **Get All Mentors**
export const getAllMentors = TryCatch(async (req, res) => {
  const mentors = await Mentor.find();
  res.status(200).json({ mentors });
});

// **Update Mentor**
export const updateMentor = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, number, description, instructor } = req.body;

  const mentor = await Mentor.findById(id);

  if (!mentor) {
    return res.status(404).json({ message: "Mentor not found" });
  }

  mentor.title = title || mentor.title;
  mentor.number = number || mentor.number;
  mentor.description = description || mentor.description;
  mentor.instructor = instructor || mentor.instructor;

  if (req.file) {
    mentor.image = req.file.path; 
  }

  await mentor.save();

  return res.status(200).json({
    message: "Mentor updated successfully",
    mentor,
  });
});

// **Delete Mentor**
export const deleteMentor = TryCatch(async (req, res) => {
  const { id } = req.params;

  const mentor = await Mentor.findById(id);

  if (!mentor) {
    return res.status(404).json({ message: "Mentor not found" });
  }

  const fs = require('fs');
  const path = mentor.image; 
  if (fs.existsSync(path)) {
    fs.unlinkSync(path); 
  }

  await mentor.remove();

  return res.status(200).json({
    message: "Mentor deleted successfully",
  });
});
