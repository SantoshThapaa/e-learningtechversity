import sendMail from "../middlewares/sendMail.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user)
            return res.status(400).json({
                message: "User already exists",
            });
        const hashPassword = await bcrypt.hash(password, 10)
        user = {
            name,
            email,
            password: hashPassword,
        };
        const otp = Math.floor(Math.random() * 1000000);

        const activationToken = jwt.sign({
            user,
            otp,
        },
            process.env.Activation_Secret,
            {
                expiresIn: "5m",
            });
        const data = {
            name, otp,
        };
        await sendMail(
            email,
            "Techversity",
            data
        )
        res.status(200).json({
            message: "Otp send to your mail",
            activationToken,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};
export const verifyUser = async(req, res) => {
    try {

    } catch (error){
        res.status(500).json({
            
        })
    }
}
