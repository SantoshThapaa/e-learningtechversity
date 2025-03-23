import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './database/db.js';
//importing routes
import userRoutes from "./routes/user.js";

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
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});