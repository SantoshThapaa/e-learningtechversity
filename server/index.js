import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDb } from './database/db.js';
import { startNotificationScheduler } from './scheduler.js';
//importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";
import testimonialRoutes from "./routes/testimonial.js";
import paymentRoutes from "./routes/payment.js";
import resourceRoutes from "./routes/resource.js";
import messageRoutes from "./routes/message.js";
import assignmentRoutes from "./routes/assignment.js";
import studyMaterialRoutes from "./routes/studyMaterial.js";
import blogRoutes from './routes/blog.js';
import courseResourceRoutes from './routes/courseResourceRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import attendanceRoutes from './routes/attendance.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedOrigins = ["http://localhost:3000"];


app.use(cors());

app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);
app.use("/api", testimonialRoutes);
app.use('/api/', paymentRoutes);
app.use('/api/', resourceRoutes);
app.use('/api/', messageRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use('/api/resources', courseResourceRoutes);
app.use('/api/', blogRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api", notificationRoutes);
app.use("/api", attendanceRoutes);

app.get('/', (req, res) => {
    res.send("Server is working");
});

startNotificationScheduler();

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});
