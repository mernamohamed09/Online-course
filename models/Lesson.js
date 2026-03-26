const mongoose =require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String, 
        default: ""
    },
    videoURL: {
        type: String, 
        default: ""
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;