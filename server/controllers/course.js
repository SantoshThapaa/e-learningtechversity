import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getAllCourses = TryCatch(async (req, res) => {
    const courses = await Courses.find();
    res.json({
        courses,
    });
});

export const getSingleCourse = TryCatch(async(req, res)=>{
    const course = await Courses.findById(req.params.id)
    res.json({
        course,
    })
})

export const addCourses = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id); 
    if (!course)
        return res.status(404).json({
            message: "No Course with this id",
        });
    
    const { title, description } = req.body;
    const file = req.file; 
    const { videoLink } = req.body;  
    const lecture = await Courses.create({
        title,
        description,
        video: videoLink, 
        course: course._id,
    });

    res.status(201).json({
        message: "Lecture Added"
    });
});

// export const fetchLectures = TryCatch(async(req, res)=>{
//     const lectures = await Lecture.find({course: req.params.id})

//     const user = await User.findById(req.params.id);

//     if(user.r)
// })
