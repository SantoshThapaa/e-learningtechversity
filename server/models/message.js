import mongoose from "mongoose";


const message = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
       
    },
    
    email:{
        type: String,
        required: true,
        
    },
    
    message:{
        type: String,
        required: true,
        minLength: [10, "Message Must contain exact 10 characters!"],
    },
});
export const Message= mongoose.model("Message", message);