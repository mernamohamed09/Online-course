const Course = require("../models/Course");
const { createCourseSchema, updateStatusSchema } = require("./validation/authValidate");

// create course (Instructor)
const createCourse = async (req, res) => {
    try {
        const { error, value } = createCourseSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map(err => err.message)
            });
        }

        const { title, description, price } = value;

        const newCourse = await Course.create({
            title,
            description,
            price,
            status: "Pending",
            instructor: req.user._id
        });

        res.status(201).json({
            msg: "Course created successfully and pending approval",
            course: newCourse
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// update course status (Admin)
const updateCourseStatus = async (req, res) => {
    try {
        const { error, value } = updateStatusSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map(err => err.message)
            });
        }

        const { status } = value;

        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: "Course not found" });

        course.status = status;
        course.approvedBy = req.user._id;

        await course.save();

        res.json({ msg: `Course status updated to ${status}`, course });

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// get courses (Student sees Published only)
const getCourses = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === "Student") {
            query.status = "Published";
        }

        const courses = await Course.find(query)
            .populate("instructor", "username email")
            .populate("approvedBy", "username email");

        res.json({ courses });

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports = {
    createCourse,
    updateCourseStatus,
    getCourses
};