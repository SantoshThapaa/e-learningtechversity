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
        assignment: {
            ...assignment.toObject(),
            course: {
                _id: course._id,
                title: course.title,
            }
        },
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
    const studentId = req.user._id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    const alreadySubmitted = await Submission.findOne({
      assignment: assignmentId,
      student: studentId
    });
    if (alreadySubmitted) {
      return res.status(400).json({ message: "You have already submitted this assignment" });
    }
    const submission = await Submission.create({
      assignment: assignmentId,
      student: studentId,
      fileUrl,
    });
    res.status(201).json({
      message: "Submission successful",
      submission,
    });
  });
  
  export const checkStatus = TryCatch(async (req, res) => {
    const { assignmentId } = req.params;
    const studentId = req.user._id;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    const submission = await Submission.findOne({
      assignment: assignmentId,
      student: studentId,
    });
    if (submission) {
      return res.status(200).json({
        message: "Assignment already submitted",
        submitted: true,
      });
    }
    res.status(200).json({
      message: "Assignment not submitted",
      submitted: false,
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

export const getAssignmentsByCourse = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const assignments = await Assignment.find({ course: courseId })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        if (assignments.length === 0) {
            return res.status(200).json({
                message: "No assignments found for this course"
            });
        }

        return res.status(200).json({ assignments });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return res.status(500).json({
            message: "Server error while fetching assignments"
        });
    }
});


export const getAllAssignments = TryCatch(async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate("course", "title")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        if (assignments.length === 0) {
            return res.status(200).json({
                message: "No assignments found"
            });
        }

        res.status(200).json({
            count: assignments.length,
            assignments
        });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return res.status(500).json({
            message: "Server error while fetching assignments"
        });
    }
});

export const getSingleStudentSubmissionsForTeacher = TryCatch(async (req, res) => {
  const teacherId = req.user._id;
  const { studentId } = req.params;
  const assignments = await Assignment.find({ createdBy: teacherId }).select("_id");
  const assignmentIds = assignments.map(a => a._id);
const submissions = await Submission.find({
    assignment: { $in: assignmentIds },
    student: studentId
  })
    .populate("assignment", "title taskNumber")
    .populate("student", "name email")
    .sort({ submittedAt: -1 });

  if (submissions.length === 0) {
    return res.status(200).json({
      message: "No submissions found for this student",
      submissions: [],
    });
  }

  res.status(200).json({
    count: submissions.length,
    submissions: submissions.map(sub => ({
      submissionId: sub._id,
      assignmentId: sub.assignment._id,
      assignmentTitle: sub.assignment.title,
      taskNumber: sub.assignment.taskNumber,
      studentId: sub.student._id,
      studentName: sub.student.name,
      studentEmail: sub.student.email,
      fileUrl: sub.fileUrl,
      submittedAt: sub.submittedAt,
    })),
  });
});


export const getSubmittedAssignmentIds = TryCatch(async (req, res) => {
    const studentId = req.user._id;
  
    const submissions = await Submission.find({ student: studentId }).select("assignment");
  
    const submittedAssignmentIds = submissions.map((s) => s.assignment.toString());
  
    res.status(200).json({ submittedAssignmentIds });
  });

  export const getSubmissionStatus = TryCatch(async (req, res) => {
    const { assignmentId } = req.params;
    const studentId = req.user._id;
  
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  
    const submission = await Submission.findOne({
      assignment: assignmentId,
      student: studentId,
    }).populate("assignment", "title");
  
    if (!submission) {
      return res.status(200).json({
        status: "Not Submitted",
        dueDate: assignment.dueDate,
        lastChange: "N/A",
        feedback: "No feedback yet",
      });
    }
  
    const { fileUrl, submittedAt, feedback } = submission;
    const lastChange = new Date(submittedAt).toISOString().split('T')[0]; 
    const status = fileUrl ? "Submitted" : "Not Submitted";
  
    res.status(200).json({
      status,
      dueDate: assignment.dueDate,
      lastChange,
      feedback: feedback || "No feedback yet",
    });
  });

  export const updateSubmissionStatus = TryCatch(async (req, res) => {
    const { assignmentId } = req.params;
    const { feedback } = req.body;
    const teacherId = req.user._id;
    const submission = await Submission.findOne({
      assignment: assignmentId,
      createdBy: teacherId,  
    });
  
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    submission.feedback = feedback;
    submission.submittedAt = new Date();
  
    await submission.save();
  
    res.status(200).json({
      message: "Feedback updated successfully",
      submission,
    });
  });

  