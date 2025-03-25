import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = TryCatch(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = new User({
        name,
        email,
        password: hashPassword, 
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    const activationToken = jwt.sign(
        { email, otp }, 
        process.env.Activation_Secret, 
        { expiresIn: "5m" }
    );
    await sendMail(email, "Techversity", { name, otp });
    res.status(200).json({
        message: "OTP sent to your email",
        activationToken,
    });
});




export const verifyUser = TryCatch(async (req, res) => {
    const {otp, activationToken} = req.body;
    const verify = jwt.verify(activationToken, process.env.Activation_Secret);
    if(!verify)
        return res.status(400).json({
    message: "Otp Expired",
    });
    if(verify.otp !== otp) return res.status(400).json({
        message: "Invalid otp",
    });
    if(!verify.user || !verify.user.name || !verify.user.email || !verify.user.password){
        return res.status(400).json({
            message: "Invalid user",
        });
    }
    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password,
    })
    res.json({
        message: "User Registered Successfully!"
    });
});


export const loginUser = TryCatch(async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) 
        return res.status(400).json({
    message: "No User with this email",
});
const mathPassword=await bcrypt.compare(password, user.password);
if(!mathPassword)
    return res.status(400).json({
message: "Invalid Password",
});
const token = await jwt.sign({_id: user._id}, process.env.Jwt_Sec, {
    expiresIn: "15d",
});

res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
});
});

export const myProfile = TryCatch(async(req, res)=> {
    const user = await User.findById(req.user._id);
    res.json({user});
})

