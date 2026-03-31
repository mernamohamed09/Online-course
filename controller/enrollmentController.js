const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const { enrollSchema } = require("./validation/enrollmentValidation");

const enrollCourse = async (req, res) => {
  try {
    
    const { error, value } = enrollSchema.validate(
      { courseId: req.params.courseId },
      { abortEarly: false,
        stripUnknown: true }
    );

    if (error) {
      return res.status(400).json({
        msg: error.details.map(err => err.message)
      });
    }

    const courseId = value.courseId;

    const studentId = req.user.id; 

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) 
        return res.status(404).json({ msg: "Course not found" });

    // Only Students can enroll
    if (req.user.role !== "Student") {
      return res.status(403).json({ msg: "Only students can enroll" });
    }

    // Prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({ student: studentId, course: courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ msg: "You are already enrolled in this course" });
    }

    // create enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    res.status(201).json({
      msg: "Enrollment successful",
      enrollment
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
};

// Get all courses a student is enrolled in
const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user._id;

    const enrollments = await Enrollment.find({ student: studentId })
      .populate("course", "title description price status")
      .populate("course.instructor", "username email");


    res.status(200).json({ enrolledCourses: enrollments });


  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = { enrollCourse, getEnrolledCourses };