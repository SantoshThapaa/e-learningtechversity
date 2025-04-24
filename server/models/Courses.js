import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    batchNo:{
        type:Number,
        required:true,
    },
    duration: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startDate: {
        type: Date,
        default: function() {
            return this.createdAt;
        }
    },
    endDate: {
        type: Date, 
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

schema.pre('save', function(next) {
    if (this.duration) {
        const durationParts = this.duration.split(' ');
        if (durationParts.length !== 2) {
            return next(new Error("Invalid duration format. Expected format: '<number> <unit>'"));
          }
        const number = parseInt(durationParts[0]);
        const unit = durationParts[1].toLowerCase();

        let timeToAdd;

        if (unit === 'weeks') {
            timeToAdd = number * 7 * 24 * 60 * 60 * 1000;
        } else if (unit === 'months') {
            timeToAdd = number * 30 * 24 * 60 * 60 * 1000;
        }

        if (timeToAdd) {
            const calculatedEndDate = new Date(this.createdAt.getTime() + timeToAdd);
            this.endDate = calculatedEndDate;
          } else {
            return next(new Error("Invalid duration unit. Expected 'weeks' or 'months'."));
          }
        } else {
         
          return next(new Error("Duration is required"));
        }

    next();
});

export const Courses = mongoose.model("Courses", schema);
