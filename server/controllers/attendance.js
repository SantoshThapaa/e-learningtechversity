import TryCatch from "../middlewares/TryCatch.js";
import { Attendance } from "../models/Attendance.js";
import { Courses } from "../models/Courses.js";

export const getStudentsByCourse = TryCatch(async (req, res) => {
  const { courseId } = req.params;
  const teacherId = req.user._id;
  const course = await Courses.findById(courseId).populate({
    path: "enrolledStudents",
    select: "name",
  });
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (!course.assignedTo.includes(teacherId)) {
    return res.status(403).json({ message: "You are not assigned to this course" });
  }
  res.json({ students: course.enrolledStudents });
});

export const saveAttendance = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { attendanceRecords } = req.body;
    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
  
    const results = await Promise.all(
      attendanceRecords.map(async (record) => {
        const { studentId, date, present } = record;
        
        let attendance = await Attendance.findOne({ studentId, courseId, date });
        if (!attendance) {
          attendance = new Attendance({ studentId, courseId, date, present: present || false });
        } else {
          attendance.present = present !== undefined ? present : false; 
        }
        await attendance.save();
        return attendance;
      })
    );
  
    res.status(200).json({ message: "Attendance saved successfully", data: results });
  });
  

export const getStudentAttendance = TryCatch(async (req, res) => {
  const studentId = req.user._id;
  const today = new Date();
  let lastThreeDays = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastThreeDays.push(date.toISOString().split("T")[0]);
  }
  const attendanceRecords = await Attendance.find({
    studentId,
    date: { $in: lastThreeDays },
  });
  const formattedAttendance = lastThreeDays.map((date) => {
    const record = attendanceRecords.find((att) => att.date === date);
    return {
      date,
      present: record ? record.present : false,
    };
  });
  res.json({ attendance: formattedAttendance });
});

export const getStudentAttendancePercentage = TryCatch(async (req, res) => {
  const studentId = req.user._id;
  const { courseId } = req.params;
  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  const attendanceRecords = await Attendance.find({ studentId, courseId });
  if (attendanceRecords.length === 0) {
    return res.status(200).json({
      attendancePercentage: 0, 
      totalDays: 0,
      daysPresent: 0,
    });
  }
  const totalDays = attendanceRecords.length;
  const daysPresent = attendanceRecords.filter(record => record.present).length;
  const attendancePercentage = (daysPresent / totalDays) * 100;
  res.status(200).json({
    attendancePercentage: attendancePercentage.toFixed(2), 
    totalDays,
    daysPresent,
  });
});
