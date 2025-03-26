import TryCatch from "../middlewares/TryCatch.js";
import { Resource } from "../models/Resource.js";

export const uploadResource = TryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;
    const teacherId = req.user._id;
    const file = req.file;

    const course = await Courses.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    if (!course.assignedTeachers.includes(teacherId.toString())) {
        return res.status(403).json({
            message: "You are not assigned to this course",
        });
    }

    const resource = await Resource.create({
        title,
        file: file?.path,
        course: course._id,
        uploadedBy: teacherId,
    });

    res.status(201).json({
        message: "Resource uploaded successfully",
        resource,
    });
});

export const getCourseResources = TryCatch(async (req, res) => {
    const { courseId } = req.params;

    const resources = await Resource.find({ course: courseId }).populate("uploadedBy", "name email");

    res.json({
        resources,
    });
});

export const deleteResource = TryCatch(async (req, res) => {
    const { id } = req.params;

    const resource = await Resource.findById(id);
    if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
    }

    rm(resource.file, () => {
        console.log("Resource file deleted");
    });

    await resource.deleteOne();

    res.json({
        message: "Resource deleted successfully",
    });
});

