const Course = require("../models/Course");

const lessonMiddleware = async (req, res, next) => {
    try {
        // نجيب الكورس من الـ params
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        // نتأكد إن صاحب الكورس هو نفسه الـ instructor اللي عامل request
        if (course.instructor.toString() !== req.user.id && course.instructor.toString() !== req.user._id) {
            return res.status(403).json({ msg: "You are not the owner of this course" });
        }

        // نخزن الكورس في req عشان نستخدمه بعدين في الـ controller
        req.course = course;

        next();
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports = lessonMiddleware;