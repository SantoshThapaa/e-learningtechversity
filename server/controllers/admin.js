import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js"
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { rm } from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(rm);


const validateDuration = (duration) => {
  const durationParts = duration.split(' ');
  if (durationParts.length !== 2) {
    throw new Error('Invalid duration format. Expected format: "<number> <unit>"');
  }

  const number = parseInt(durationParts[0]);
  const unit = durationParts[1].toLowerCase();

  if (isNaN(number) || !['weeks', 'months', 'years'].includes(unit)) {
    throw new Error('Invalid duration format. Number and valid unit (weeks, months, or years) expected.');
  }

  return { number, unit };
};

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

  try {
    const { number, unit } = validateDuration(duration);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

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
  const teachers = await User.find({ role: 'teacher' })
    .select('-password')
    .populate({
      path: 'assignedTo',  
      model: 'Courses',    
      select: 'title description price duration image', 
    });

  if (!teachers || teachers.length === 0) {
    return res.status(404).json({
      message: "No teachers found",
    });
  }

  res.status(200).json({
    message: "All teachers fetched successfully",
    teachers,
  });
});

export const getAllAdmins = TryCatch(async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('-password');
  if (!admins || admins.length === 0) {
    return res.status(404).json({
      message: "No admins found",
    });
  }
  res.status(200).json({
    message: "All admins fetched successfully",
    admins,
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

export const getTeacherById = TryCatch(async (req, res) => {
  const teacher = await User.findById(req.params.id).select('-password');

  if (!teacher || teacher.role !== 'teacher') {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  res.status(200).json({
    message: "Teacher fetched successfully",
    teacher
  });
});

export const assignTeacherToCourse = TryCatch(async (req, res) => {
  const { courseId, teacherId } = req.body;

  if (!courseId || !teacherId) {
    return res.status(400).json({ message: 'Course ID and Teacher ID are required.' });
  }

  const course = await Courses.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const teacher = await User.findById(teacherId);
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  if (course.assignedTo.includes(teacherId)) {
    return res.status(400).json({ message: "Teacher already assigned to this course" });
  }

  course.assignedTo.push(teacherId);
  await course.save();

  teacher.assignedTo.push(courseId);
  await teacher.save();

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

export const registerAdmin = TryCatch(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    isApprovedByAdmin: true,
  });

  res.status(201).json({ message: "Admin registered successfully", admin });
});


export const adminLogin = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Only admins can log in." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({
    id: user._id,
    photoUrl: user.photoUrl || '',
    role: user.role,
  },
    process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({ token, user });
});



