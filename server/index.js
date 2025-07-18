import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDb } from './database/db.js';
import { startNotificationScheduler } from './scheduler.js';
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
import logoRoutes from './routes/logo.js';
import teamRoutes from './routes/team.js';
import featureRoutes from './routes/featureCard.js';
import mentorRoutes from './routes/mentor.js';
import courseResourceRoutes from './routes/courseResourceRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import attendanceRoutes from './routes/attendance.js';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedOrigins = [
  'http://localhost:3000',
  'https://front.bishalpantha.com.np'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);
app.use("/api", mentorRoutes);
app.use("/api", teamRoutes);
app.use("/api", testimonialRoutes);
app.use("/api", paymentRoutes);
app.use("/api", logoRoutes);
app.use("/api", featureRoutes);
app.use("/api", resourceRoutes);
app.use("/api", messageRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/resources", courseResourceRoutes);
app.use("/api", blogRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api", notificationRoutes);
app.use("/api", attendanceRoutes);

app.get('/', (req, res) => {
  res.send("Server is working");
});

startNotificationScheduler();

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectDb();
});
