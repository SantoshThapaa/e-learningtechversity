import mongoose from 'mongoose';

const SubSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subSections: [SubSectionSchema],
});

const CourseResourceSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  sections: [SectionSchema],
});

export const CourseResource = mongoose.model('CourseResource', CourseResourceSchema);