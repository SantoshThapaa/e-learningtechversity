import StudyMaterial from '../models/StudyMaterial.js';

export const uploadStudyMaterial = async (req, res) => {
    try {
        const file = req.file;
        const { title, uploaderId, courseId } = req.body;

        if (!file || !title || !courseId) {
            return res.status(400).json({ message: 'Title, course, and document are required.' });
        }

        const newMaterial = new StudyMaterial({
            title,
            fileUrl: `/uploads/documents/${file.filename}`,
            fileName: file.originalname,
            fileType: file.mimetype,
            uploader: uploaderId,
            course: courseId,
        });

        await newMaterial.save();

        res.status(201).json({
            message: 'Study material uploaded successfully.',
            material: newMaterial
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteStudyMaterials = async (req, res) => {
    try {
        const { fileIds } = req.body;

        if (!fileIds || !fileIds.length) {
            return res.status(400).json({ message: "No files selected for deletion." });
        }
        const result = await StudyMaterial.deleteMany({
            _id: { $in: fileIds },
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No materials found to delete." });
        }

        res.status(200).json({ message: `${result.deletedCount} study materials deleted successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getStudyMaterialsByTeacher = async (req, res) => {
    try {
        const { uploaderId } = req.params;

        if (!uploaderId) {
            return res.status(400).json({ message: "Uploader ID is required." });
        }

        const materials = await StudyMaterial.find({ uploader: uploaderId })
            .populate("course", "title")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Study materials retrieved successfully.",
            materials,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStudyMaterialsByCourse = async (req, res) => {
    try {
      const { courseId } = req.params;  
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required." });  
      }
      const materials = await StudyMaterial.find({ course: courseId })
        .populate("course", "title") 
        .populate("course.assignedTo", "name") 
        .sort({ createdAt: -1 });  
  
      if (!materials.length) {
        return res.status(404).json({ message: "No study materials found for this course." });  
      }
      res.status(200).json({
        message: "Study materials fetched successfully.",
        materials,  
      });
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    }
  };
  
  