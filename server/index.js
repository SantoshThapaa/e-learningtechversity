import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDb } from './database/db.js';
//importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";
import testimonialRoutes from "./routes/testimonial.js";
import paymentRoutes from "./routes/payment.js";
import resourceRoutes from "./routes/resource.js";
import messageRoutes from "./routes/message.js";


const app= express();

dotenv.config();
// Enable CORS for all routes
app.use(cors());
//using middlewares
app.use(express.json());
const port =4000;

app.get('/',(req, res)=>{
    res.send("Server is working");
});

// using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);
app.use("/api", testimonialRoutes);
app.use('/api/', paymentRoutes);
app.use('/api/', resourceRoutes);
app.use('/api/', messageRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});