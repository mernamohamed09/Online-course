const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const lessonMiddleware = require("../middlewares/lessonMiddleware");
const uploadVideo = require("../middlewares/uploadVideo");
const { addLesson } = require("../controllers/lessonController");

router.post(
    "/courses/:courseId/lessons",
    authMiddleware,                  // JWT verify
    roleMiddleware("Instructor"),    // لازم يكون instructor
    lessonMiddleware,                // لازم يكون صاحب الكورس
    uploadVideo.single("video"),     // رفع الفيديو
    addLesson                        // controller
);

module.exports = router;