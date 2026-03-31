
const mongoose = require ("mongoose");

const courseSchema = new mongoose.Schema({
title:{
    type: String,
    required: true,
    trim: true
},
description:{
    type: String,
    required: true,
    trim: true
},
price:{
    type: Number,
    required: true,
    min: 0
},
status:{
    type:String,
    enum: ["Draft", "Pending", "Published", "Archived"],
    default: "Draft"
    },

instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
approvedBy: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User"
     },
lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
}]
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

