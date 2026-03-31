const Course = require("../models/Course");

const lessonMiddleware = async (req, res, next) => {
    try {
       
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ msg: "You are not the owner of this course" });
        }

    
        req.course = course;

        next();
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports = lessonMiddleware;