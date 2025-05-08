import fs from 'fs';
import TryCatch from '../middlewares/TryCatch.js';
import FeatureCard from '../models/FeatureCard.js';


export const addFeatureCard = TryCatch(async (req, res) => {
  const { title, text } = req.body;
  const image = req.file?.path;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  const featureCard = new FeatureCard({
    title,
    text,
    image,
  });

  await featureCard.save();

  return res.status(201).json({
    message: "Feature card added successfully",
    featureCard,
  });
});


export const getAllFeatureCards = TryCatch(async (req, res) => {
  const featureCards = await FeatureCard.find();
  res.status(200).json({ featureCards });
});

export const updateFeatureCard = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  const featureCard = await FeatureCard.findById(id);

  if (!featureCard) {
    return res.status(404).json({ message: "Feature card not found" });
  }

  featureCard.title = title || featureCard.title;
  featureCard.text = text || featureCard.text;

  if (req.file) {
    featureCard.image = req.file.path;
  }

  await featureCard.save();

  return res.status(200).json({
    message: "Feature card updated successfully",
    featureCard,
  });
});

// Delete a feature card
export const deleteFeatureCard = TryCatch(async (req, res) => {
  const { id } = req.params;

  const featureCard = await FeatureCard.findById(id);

  if (!featureCard) {
    return res.status(404).json({ message: "Feature card not found" });
  }

  const fs = require('fs');
  const path = featureCard.image; 
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  await featureCard.remove();

  return res.status(200).json({
    message: "Feature card deleted successfully",
  });
});
