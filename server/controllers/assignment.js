import TryCatch from "../middlewares/TryCatch.js";
import { Assignment } from "../models/Assignment.js";
import { Courses } from "../models/Courses.js";
import { Submission } from "../models/Submission.js";

export const postAssignment = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { title, description, deadline } = req.body;
    const teacherId = req.user._id;

    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.assignedTo || !course.assignedTo.includes(teacherId.toString())) {
        return res.status(403).json({ message: "You are not assigned to this course" });
    }
    const currentCount = await Assignment.countDocuments({ course: courseId });
    const taskNumber = currentCount + 1;

    const assignment = await Assignment.create({
        taskNumber,
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


export const getTeacherAssignments = TryCatch(async (req, res) => {
    const teacherId = req.user._id;
    const courses = await Courses.find({ assignedTo: teacherId });
    const courseIds = courses.map(course => course._id);
    const assignments = await Assignment.find({
      course: { $in: courseIds },
      createdBy: teacherId
    })
      .populate("course", "title") 
      .sort({ createdAt: -1 });
  
    res.json({
      teacherId,
      count: assignments.length,
      assignments
    });
  });
  

export const submitAssignment = TryCatch(async (req, res) => {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body;
    const studentId = req.user._id;

    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Check if student has already submitted
    const alreadySubmitted = await Submission.findOne({
        assignment: assignmentId,
        student: studentId
    });
    if (alreadySubmitted) {
        return res.status(400).json({ message: "You have already submitted this assignment" });
    }

    // Create new submission
    const submission = await Submission.create({
        assignment: assignmentId,
        student: studentId,
        fileUrl
    });

    res.status(201).json({
        message: "Submission successful",
        submission
    });
});

export const getSubmissionsForAssignment = TryCatch(async (req, res) => {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignment: assignmentId })
        .populate("student", "name email") 
        .sort({ submittedAt: -1 });

    res.json({
        assignmentId,
        submissions
    });
});