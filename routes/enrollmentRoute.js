const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
const { enrollCourse, getEnrolledCourses } = require("../controller/enrollmentController");


router.post("/courses/:courseId/enroll", authMiddleware, roleMiddleware("Student"), enrollCourse);


router.get("/my-courses", authMiddleware, roleMiddleware("Student"), getEnrolledCourses);

module.exports = router;
