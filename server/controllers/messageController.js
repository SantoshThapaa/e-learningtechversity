import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/message.js";


export const sendMessage =catchAsyncErrors(async (req, res, next) => {
    const { fullName, email, message } = req.body;
    if (!fullName|| !email ||  !message) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }
    await Message.create({ fullName,  email, message });
    res.status(200).json({
        success: true,
        message: "Message sent successfully!",
    });
});
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json({
      success: true,
      messages,
    });
  });