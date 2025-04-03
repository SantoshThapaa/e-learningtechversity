import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import TryCatch from "../middlewares/TryCatch.js";
import { OTP } from "../models/OTP.js";
import sendMail from "../middlewares/sendMail.js";

// **REGISTER**
export const register = TryCatch(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    console.log(password);
    const hashPassword = await bcrypt.hash(password, 10);
    user = new User({
        name,
        email,
        password: hashPassword,
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

    // Send OTP to email
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

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Mark OTP as verified
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

    if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email first" });
    }

    const trimmedPassword = password.trim();

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
    });
});

// **LOGOUT USER**
export const logoutUser = TryCatch(async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully",
        success: true,
    });
});


// **UPDATE PROFILE**
export const updateProfile = TryCatch(async (req, res) => {
    const { bio, profilePicture, subscription } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (bio) user.profile.bio = bio;
    if (profilePicture) user.profile.profilePicture = profilePicture;
    if (subscription) user.profile.subscription.push(subscription);

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
});

// **GET USER PROFILE**
export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
});