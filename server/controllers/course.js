import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getEnrolledStudents = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const teacherId = req.user._id;

    const course = await Courses.findById(courseId).populate("enrolledStudents");
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.assignedTo.map(id => id.toString()).includes(teacherId.toString())) {
        return res.status(403).json({ message: "You are not assigned to this course" });
      }
      

    res.json({
        students: course.enrolledStudents,
    });
});


export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.json({
        courses,
    });
});


export const getSingleCourse = TryCatch(async(req, res)=>{
    const course = await Courses.findById(req.params.id)
    res.json({
        course,
    })
})

export const getAllCategories = TryCatch(async (req, res) => {
    const categories = await Courses.distinct('category');
    res.json({ categories });
  });

export const getLecturesByCourse = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const user = await User.findById(req.user._id);
  
    if (user.role !== "teacher" && !user.subscription.includes(courseId)) {
      return res.status(403).json({ message: "Access denied to this course" });
    }
  
    const lectures = await Lecture.find({ course: courseId });
    res.json({ lectures });
  });
  

export const getMyCourses = TryCatch(async (req, res)=> {
    const courses = await Courses.find({ _id: { $in: req.user.subscription } });
    res.json({
        courses,
    });
});



export const getCoursesByCategory = TryCatch(async (req, res) => {
    const { category } = req.params;

    const courses = await Courses.find({ category });

    if (!courses.length) {
        return res.status(404).json({ message: "No courses found in category ${category}" });
    }
    res.json({
        courses,
    });
});

export const getNewBatchNo = TryCatch(async (req, res) => {
    try {
        const lastCourse = await Courses.findOne().sort({ batchNo: -1 }).limit(1);
        const nextBatchNo = lastCourse ? lastCourse.batchNo + 1 : 1;  
        res.json({ batchNo: nextBatchNo });
    } catch (err) {
        console.error('Error fetching last batch number:', err);
        res.status(500).json({ message: 'Error fetching batch number', error: err.message });
    }
});

export const getTotalLectures = TryCatch(async (req, res) => {
    const { courseId } = req.params;
  
    const lectures = await Lecture.find({ course: courseId });
    const totalLectures = lectures.length;

    if (totalLectures === 0) {
        return res.status(404).json({ message: "No lectures found for this course" });
    }

    res.status(200).json({
        totalLectures
    });
});

export const getLectureCompletionPercentage = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const course = await Courses.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const courseDurationStr = course.duration; 
    const totalLectures = parseInt(courseDurationStr); 
    if (isNaN(totalLectures)) {
        return res.status(400).json({ message: "Invalid course duration format" });
    }
    const courseStartDate = new Date(course.startDate); 
    const currentDate = new Date();
    const diffTime = currentDate - courseStartDate;
    const weeksCompleted = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)); 

    const completionPercentage = (weeksCompleted / totalLectures) * 100;

    res.status(200).json({
        totalLectures,
        completionPercentage: completionPercentage.toFixed(2) 
    });
});



