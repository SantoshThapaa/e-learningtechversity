import Logo from '../models/Logo.js';
import fs from 'fs';
import TryCatch from '../middlewares/TryCatch.js';
import path from 'path';

export const addLogo = TryCatch(async (req, res) => {
    console.log('Received file:', req.file); 
  
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
  
    const logo = new Logo({
      image: req.file.path,
    });
  
    await logo.save();
  
    return res.status(200).json({
      message: "Logo uploaded successfully",
      logo,
    });
  });

export const getAllLogos = TryCatch(async (req, res) => {
  const logos = await Logo.find();
  res.status(200).json({ logos });
});

export const deleteLogo = TryCatch(async (req, res) => {
    const logo = await Logo.findById(req.params.id);

    if (!logo || !logo.image) {
        return res.status(404).json({ message: "Logo not found or invalid path" });
    }

    const logoPath = path.join('uploads/images', logo.image.split('/').pop());

    if (fs.existsSync(logoPath)) {
        try {
            fs.unlinkSync(logoPath);
        } catch (err) {
            return res.status(500).json({ message: "Error deleting file", error: err });
        }
    }
    await Logo.deleteOne({ _id: req.params.id });

    return res.status(200).json({ message: "Logo deleted successfully" });
});