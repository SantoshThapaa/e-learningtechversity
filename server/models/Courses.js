import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required:true,
    },
    duration: {
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    createdBy:{
        type: String,
        required:false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    startDate: {
        type: Date, 
        required: true,
    },
    endDate: {
        type: Date, 
        required: true,
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],    
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

export const Courses = mongoose.model("Courses", schema);