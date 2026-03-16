const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
const { createCourse, updateCourseStatus, getCourses } = require("../controller/courseController");

// Instructor creates course
router.post("/create-course", authMiddleware, roleMiddleware("Instructor"), createCourse);

// Admin updates course status
router.patch("/update-status/:id", authMiddleware, roleMiddleware("Admin"), updateCourseStatus);

// Get courses
router.get("/courses", authMiddleware, roleMiddleware("Student", "Instructor", "Admin"), getCourses);

module.exports = router;