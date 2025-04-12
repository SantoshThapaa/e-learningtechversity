import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from 'util';
import fs from 'fs';
import { User } from "../models/User.js";

export const getAssignedCourses = TryCatch(async (req, res) => {
    const { teacherId } = req.params;  
    const courses = await Courses.find({ assignedTo: teacherId }).populate('assignedTo', 'name email');

   
    if (!courses || courses.length === 0) {
        return res.json({ courses: [] });
    }

    return res.json({ courses });
});

export const createLecture = TryCatch(async (req, res) => {
    const { courseId } = req.params;
  
    const courseExists = await Courses.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }
  
    const {
      title,
      description,
      videoLink,
      courseDuration,
      courseTime,
      hashtags,
      language,
      level,
      meetLink,
    } = req.body;
  
    if (!title || !description || !videoLink || !meetLink || !courseTime) {
      return res.status(400).json({
        message: "Title, description, videoLink, meetLink, and courseTime are required",
      });
    }
  
    let thumbnailPath = null;
    if (req.file && req.file.fieldname === "thumbnail") {
      thumbnailPath = `/uploads/thumbnails/${req.file.filename}`;
    }
  
    if (!thumbnailPath) {
      return res.status(400).json({ message: "Thumbnail is required" });
    }
  
    const newLecture = new Lecture({
      title,
      description,
      videoLink,
      thumbnail: thumbnailPath,
      meetLink,
      course: courseId,
      courseDuration,
      courseTime,
      hashtags,
      language,
      level,
    });
  
    await newLecture.save();
  
    return res.status(201).json({
      message: "Lecture uploaded successfully",
      newLecture,
    });
  });
 
export const deleteLecture = TryCatch(async(req, res)=> {
    const lecture = await Lecture.findById(req.params.id); 
    rm(lecture.video, ()=>{
        console.log("Video deleted");
    });
    await lecture.deleteOne()
    res.json({message: "Lecture Deleted"})
});


export const deleteCourse = TryCatch(async(req, res)=> {
    const course = await Courses.findById(req.params.id);
    const lectures = await Lecture.find({
        course: course._id
    })
    await Promise.all(
        lectures.map(async(lecture)=> {
            await unlinkAsync(lecture.video);
            console.log("Video Deleted");
        })
    );
    rm(course.image, ()=>{
        console.log("Image deleted");
    });

    await Lecture.find({course: req.params.id}).deleteMany()
    await course.deleteOne()
    await User.updateMany({}, {$pull:{subscription: req.params.id}});

    res.json({
        message: "Course Deleted",
    });
});


