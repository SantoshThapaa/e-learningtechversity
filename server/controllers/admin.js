import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js"
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { rm } from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(rm);


export const createCourse = TryCatch(async (req, res) => {
  const {
    title,
    description,
    batchNo,
    assignedTo,
    duration,
    category,
    createdBy,
    price = 0
  } = req.body;

  const image = req.file;

  const course = await Courses.create({
    title,
    description,
    batchNo,
    assignedTo,
    duration,
    category,
    createdBy,
    image: image?.path || '',
    price
  });

  res.status(201).json({ message: "Course created successfully", course });
});


// ✅ Delete Course
export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      if (lecture.video) await unlinkAsync(lecture.video);
    })
  );

  if (course.image) {
    rm(course.image, () => console.log("Image deleted"));
  }

  await Lecture.deleteMany({ course: req.params.id });
  await course.deleteOne();
  await User.updateMany({}, { $pull: { "profile.subscription": req.params.id } });

  res.json({ message: "Course Deleted" });
});


export const getAllStudents = TryCatch(async (req, res) => {
  const users = await User.find({ role: { $ne: "teacher" } }).select("-password");

  res.status(200).json({
    message: "All non-teacher users fetched successfully",
    users,
  });
});


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

export const getAllTeachers = TryCatch(async (req, res) => {
  const teachers = await User.find({ role: 'teacher' }).select('-password');

  res.status(200).json({
    message: "All teachers fetched successfully",
    teachers,
  });
});

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find()
    .populate('assignedTo', 'name')
    .sort({ createdAt: -1 });
  res.status(200).json({
    message: "Courses fetched successfully",
    courses,
  });
});

export const assignTeacherToCourse = TryCatch(async (req, res) => {
  const { courseId, teacherId } = req.body;

  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.assignedTo.includes(teacherId)) {
    return res.status(400).json({ message: "Teacher already assigned" });
  }

  course.assignedTo.push(teacherId);
  await course.save();

  res.json({ message: "Teacher assigned to course", course });
});




export const registerTeacher = TryCatch(async (req, res) => {
  const { name, email, phone } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const defaultPassword = "teacher@123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const teacher = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "teacher",
    isApprovedByAdmin: true
  });

  res.status(201).json({ message: "Teacher added successfully", teacher });
});


export const Teacherlogin = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role === "teacher" && !user.isApprovedByAdmin) {
    return res.status(403).json({ message: "Not approved by admin yet" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({
    id: user._id,
    photoUrl: user.photoUrl || '',
    role: user.role
  },
    process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({ token, user });
});
