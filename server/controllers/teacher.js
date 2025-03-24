import TryCatch from "../middlewares/TryCatch.js";

export const createCourse = TryCatch(async(req, res)=>{
    const {title,
        description,
        category,
        createdBy,
        duration,
        price}= req.body;
    const image = req.file;
    await courses.create({
        title,
        description,
        category,
        createdBy,
        image: image?.path,
        duration,
        price
    });
    res.status(201).json({
        message: "Course created successfully"
    });
});


export const addLectures = TryCatch(async(req, res)=>{
    const course = await Courses.findById(req.params.id)
    if(!course)
        return res.status(404).json({
    message: "No course with this id",
});
const {title, description }= req.body;

const file = req.file;

const lecture = await lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
});

return res.status(201).json({
    message:"Lecture added successfully",
    lecture,
})
})