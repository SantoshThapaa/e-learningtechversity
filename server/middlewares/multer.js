import multer from 'multer';
import { v4 as uuid } from 'uuid';
import fs from 'fs';


const createDirectoryIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};


const imageStorage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadDir = "uploads/images";
        createDirectoryIfNotExists(uploadDir); 
        cb(null, uploadDir); 
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        const fileName = `${id}.${extName}`;
        cb(null, fileName);
    },
});


const videoStorage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadDir = 'uploads/videos'; 
        createDirectoryIfNotExists(uploadDir); 
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${id}.${extName}`;
        cb(null, fileName);
    },
});

const thumbnailStorage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadDir = 'uploads/thumbnails'; 
        createDirectoryIfNotExists(uploadDir); 
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${id}.${extName}`;
        cb(null, fileName);
    },
});

const documentStorage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadDir = 'uploads/documents';
        createDirectoryIfNotExists(uploadDir);
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${id}.${extName}`;
        cb(null, fileName);
    },
});

export const uploadCourseFiles = multer()
    .fields([
        { name: 'thumbnail', maxCount: 1 }, 
        { name: 'video', maxCount: 1 }
    ]);
    export const uploadImage = multer({
        storage: imageStorage,
        limits: { fileSize: 5 * 1024 * 1024 },  
    }).single('image');  

export const uploadDocument = multer({
    storage: documentStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['pdf', 'doc', 'docx', 'pptx'];
        const ext = file.originalname.split('.').pop();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, DOCX, PPTX files are allowed.'));
        }
    },
}).single("document");

