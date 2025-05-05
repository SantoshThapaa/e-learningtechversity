import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import TryCatch from "../middlewares/TryCatch.js";
import { OTP } from "../models/OTP.js";
import sendMail from "../middlewares/sendMail.js";
import { Lecture } from "../models/Lecture.js";
import { Courses } from "../models/Courses.js";
import crypto from 'crypto';

// **REGISTER**
export const register = TryCatch(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const today = new Date().toISOString().split('T')[0];
    const expectedAdminToken = crypto
      .createHash('sha256')
      .update(process.env.ADMIN_SECRET + today)
      .digest('hex');
  
    const isAdminToken = password === expectedAdminToken;
  
    const hashPassword = await bcrypt.hash(password, 10);
  
    if (
        isAdminToken &&
        email.trim().toLowerCase() === "admin@example.com"
      ) {
      const admin = new User({
        name,
        email,
        password: hashPassword,
        role: 'admin',
        isVerified: true,
      });
  
      await admin.save();
  
      return res.status(200).json({
        message: "Admin registered successfully.",
        success: true,
      });
    }
  
    const user = new User({
      name,
      email,
      password: hashPassword,
      role: 'user',
      isVerified: false,
    });
  
    await user.save();
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
    const otpRecord = new OTP({
      userId: user._id,
      otp,
      expiresAt,
    });
  
    await otpRecord.save();
  
    await sendMail(email, "Techversity - Email Verification", { name, otp });
  
    return res.status(200).json({
      message: "OTP sent to your email. Please verify your account.",
      success: true,
    });
  });
  

// **VERIFY USER**
export const verifyUser = TryCatch(async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const otpRecord = await OTP.findOne({ userId: user._id, otp });
    if (!otpRecord || otpRecord.isVerified || new Date() > otpRecord.expiresAt) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    await user.save();

    otpRecord.isVerified = true;
    await otpRecord.save();

    return res.status(200).json({
        message: "Email verified successfully. You can now log in.",
        success: true,
    });
});

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.role !== 'teacher' && !user.isVerified) {
        return res.status(400).json({ message: "Please verify your email first" });
    }

    const trimmedPassword = password.trim();
    if (user.role === 'admin') {
        const today = new Date().toISOString().split('T')[0];
        const crypto = await import('crypto');
        const expectedToken = crypto.createHash('sha256').update(process.env.ADMIN_SECRET + today).digest('hex');

        if (trimmedPassword === expectedToken) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    role: user.role
                },
                process.env.jwt_secret,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful",
                success: true,
                token,
                name: user.name,
                photoUrl: user.photoUrl || '',
                role: user.role
            });
        }
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.jwt_secret,
        { expiresIn: "1h" }
    );

    return res.status(200).json({
        message: "Login successful",
        success: true,
        token,
        name: user.name,
        photoUrl: user.photoUrl || '',
        role: user.role
    });
});

export const logoutUser = TryCatch(async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully",
        success: true,
    });
});


export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
});


export const viewUserProfile = TryCatch(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        message: "User profile retrieved successfully",
        success: true,
        user,
    });
});


export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updatedProfile = {
            bio: req.body.bio,
            zipCode: req.body.zipCode,
            socialMedia: req.body.socialMedia ? JSON.parse(req.body.socialMedia) : undefined,
        };
        if (req.files) {
            if (req.files.profilePicture && req.files.profilePicture[0]) {
                updatedProfile.profilePicture = `/uploads/images/${req.files.profilePicture[0].filename}`;
            }
            if (req.files.coverImage && req.files.coverImage[0]) {
                updatedProfile.coverImage = `/uploads/images/${req.files.coverImage[0].filename}`;
            }
        }
        const update = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            profile: updatedProfile,
        };

        const updatedUser = await User.findByIdAndUpdate(userId, update, {
            new: true,
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Profile update failed:', err);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};



export const deleteUserProfile = TryCatch(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
        message: "User deleted successfully",
        success: true,
    });
});


export const getLecturesByCourse = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const courseExists = await Courses.findById(courseId);
    if (!courseExists) {
        return res.status(404).json({ message: "Course not found" });
    }
    const lectures = await Lecture.find({ course: courseId });

    return res.status(200).json({
        lectures,
    });
});



