import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
//importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";

const app= express();

dotenv.config();

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
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});