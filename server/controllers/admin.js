import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js"
import { Lecture } from "../models/Lecture.js";

export const getAllStats = TryCatch(async (req, res) => {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalStudents = (await User.find()).length;
    const totalTeachers = (await User.find({ role: 'teacher' })).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalStudents,
        totalTeachers
    };

    res.json({
        stats,
    });
});


export const assignTeacherToCourse = TryCatch(async (req, res) => {
    const { 
        courseId, 
        teacherId 
    } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (course.assignedTeachers.includes(teacherId)) {
        return res.status(400).json({ message: "Teacher already assigned" });
    }

    course.assignedTeachers.push(teacherId);
    await course.save();

    res.json({ message: "Teacher assigned to course" });
});
