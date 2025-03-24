import TryCatch from "../middlewares/TryCatch.js";
import { Course } from "../models/Lecture.js";

export const addCourses = TryCatch(async (req, res) => {
    const course = await Course.findById(req.params.id); 
    if (!course)
        return res.status(404).json({
            message: "No Course with this id",
        });
    
    const { title, description } = req.body;
    const file = req.file; 
    const { videoLink } = req.body;  
    const lecture = await Course.create({
        title,
        description,
        video: videoLink, 
        course: course._id,
    });

    res.status(201).json({
        message: "Lecture Added"
    });
});
