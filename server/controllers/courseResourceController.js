import mongoose from 'mongoose';
import { uploadVideo } from "../middlewares/multer.js";
import { CourseResource } from "../models/CourseResource.js";

export const addSectionOrSubheading = async (req, res) => {
  uploadVideo(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { courseId } = req.params;
    const { sectionTitle, subHeadingTitle } = req.body;
    const video = req.file;
    if (!video) return res.status(400).json({ message: 'Video file is required.' });

    const videoUrl = `/uploads/videos/${video.filename}`;

    try {
      let resource = await CourseResource.findOne({ course: courseId });

      if (!resource) {
        resource = new CourseResource({
          course: courseId,
          sections: [{
            title: sectionTitle,
            subSections: [{
              title: subHeadingTitle,
              videoUrl
            }]
          }]
        });
      } else {
        let section = resource.sections.find(sec => sec.title === sectionTitle);

        if (!section) {
          resource.sections.push({
            title: sectionTitle,
            subSections: [{
              title: subHeadingTitle,
              videoUrl
            }]
          });
        } else {
          section.subSections.push({
            title: subHeadingTitle,
            videoUrl
          });
        }
      }

      await resource.save();
      res.status(200).json({ message: 'Subheading added successfully', resource });

    } catch (error) {
      res.status(500).json({ message: 'Server error while saving resource' });
    }
  });
};

export const getCourseResources = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId); 
    const resources = await CourseResource.findOne({ course: courseId }).populate('course');

    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: 'No resources found for this course' });
    }

    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching course resources:', error); 
    res.status(500).json({ message: 'Failed to fetch course resources' });
  }
};

export const deleteSubheading = async (req, res) => {
  const { courseId, sectionTitle, subHeadingTitle } = req.body;

  try {
    const resource = await CourseResource.findOne({ course: courseId });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    const sectionIndex = resource.sections.findIndex(sec => sec.title === sectionTitle);
    if (sectionIndex === -1) return res.status(404).json({ message: 'Section not found' });

    resource.sections[sectionIndex].subSections = resource.sections[sectionIndex].subSections.filter(
      sub => sub.title !== subHeadingTitle
    );

    await resource.save();
    res.status(200).json({ message: 'Subheading deleted successfully', resource });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subheading' });
  }
};


export const updateSectionTitle = async (req, res) => {
    const { courseId, oldTitle, newTitle } = req.body;
  
    try {
      const resource = await CourseResource.findOne({ course: courseId });
      if (!resource) return res.status(404).json({ message: 'Course resource not found' });
  
      const section = resource.sections.find(sec => sec.title === oldTitle);
      if (!section) return res.status(404).json({ message: 'Section not found' });
  
      section.title = newTitle;
      await resource.save();
  
      res.status(200).json({ message: 'Section title updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update section title' });
    }
  };

  export const getCourseIdBySectionTitle = async (req, res) => {
    const { sectionTitle } = req.params;
  
    try {
      const resource = await CourseResource.findOne({
        'sections.title': sectionTitle,
      });
  
      if (!resource) {
        return res.status(404).json({ message: 'No course found for the given section title' });
      }
  
      res.status(200).json({ courseId: resource.course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching courseId by section title' });
    }
  };
  
  
