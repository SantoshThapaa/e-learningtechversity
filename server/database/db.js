import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    } catch(error){
        console.log(error);
    }
}