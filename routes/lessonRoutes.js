const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
const lessonMiddleware = require("../Middleware/lessonMiddleware");
const uploadVideo = require("../Middleware/UploadVideos");
const { addLesson, updateLesson, deleteLesson } = require("../controller/lessonController");

router.post("/courses/:courseId/lessons",authMiddleware,
    roleMiddleware("Instructor"),lessonMiddleware,
    uploadVideo.single("video"),addLesson);


router.patch("/courses/:courseId/lessons/:lessonId",authMiddleware,
  roleMiddleware("Instructor"),lessonMiddleware,
  uploadVideo.single("video"),updateLesson);



router.delete("/courses/:courseId/lessons/:lessonId",authMiddleware,
  roleMiddleware("Instructor"),
  lessonMiddleware, deleteLesson);


module.exports = router;