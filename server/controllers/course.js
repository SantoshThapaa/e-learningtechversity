// import { instance } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";

export const getEnrolledStudents = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const teacherId = req.user._id;

    const course = await Courses.findById(courseId).populate("enrolledStudents");
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.assignedTeachers.includes(teacherId.toString())) {
        return res.status(403).json({ message: "You are not assigned to this course" });
    }

    res.json({
        students: course.enrolledStudents,
    });
});


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



export const fetchLectures = TryCatch(async(req, res)=>{
    const lectures = await Lecture.find({
        course: req.params.id}
    )

    const user = await User.findById(req.params.id);

    if(user.role== "teacher"){
        return res.json({lectures});
    }
    if(!user.subscription.includes(req.params.id))
        return res.status(400).json({
    message: "You dont have access to this course",
    });
    res.json({lectures});   
});




export const fetchLecture = TryCatch(async(req, res)=>{
    const lecture = await Lecture.find({course: req.params.id})

    const user = await User.findById(req.params.id);

    if(user.role== "teacher"){
        return res.json({lecture});
    }
    if(!user.subscription.includes(req.params.id))
        return res.status(400).json({
    message: "You dont have access to this course",
    });
    res.json({lecture});   
});


export const getMyCourses = TryCatch(async (req, res)=> {
    const courses = await Courses.find({_id: req.user.subscription});

    res.json({
        courses,
    });
});



export const checkout = TryCatch(async(req, res)=>{
    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    if(user.subscription.includes(course._id)){
        return res.status(400).json({
            message: "You already have access to this course",
        });
    }

    const options = {
        amount: Number(course.price * 100),
        currency: "USD",
    };

    const order = await instance.orders.create(options);

    res.status(201).json({
        order,
        course,
    });
});

