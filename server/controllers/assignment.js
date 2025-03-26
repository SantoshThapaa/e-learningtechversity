import TryCatch from "../middlewares/TryCatch.js";
import { Assignment } from "../models/Assignment.js";
import { Courses } from "../models/Courses.js";

export const postAssignment = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { title, description, deadline } = req.body;
    const teacherId = req.user._id;

    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.assignedTeachers.includes(teacherId.toString())) {
        return res.status(403).json({ message: "You are not assigned to this course" });
    }

    const assignment = await Assignment.create({
        title,
        description,
        deadline,
        course: course._id,
        createdBy: teacherId,
    });

    res.status(201).json({
        message: "Assignment posted successfully",
        assignment,
    });
});
