import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js"
import { Lecture } from "../models/Lecture.js";

export const getAllStats = TryCatch(async(req, res)=> {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalStudents = (await User.find()).length;
    const totalTeachers = (await User.find({role: 'teacher'})).length;

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