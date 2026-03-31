
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const {createLessonSchema, updateLessonSchema} = require("./validation/lessonValidation");


const addLesson = async (req, res) => {
    try {
        const { error, value } = createLessonSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                msg: error.details.map(err => err.message)
            });
        }

        const { title, content } = value;

        const course = req.course;

        const videoURL = req.file ? req.file.path : "";

        const lesson = await Lesson.create({
            title,
            content,
            videoURL,
            course: course._id
        });

        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({
            msg: "Lesson added successfully",
            lesson
        });

    } catch (err) {
        res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};


// update lesson


const updateLesson = async (req, res) => {
  try {
  
    const { error, value } = updateLessonSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        msg: error.details.map(err => err.message)
      });
    }

    const { title, content } = value;


    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found" });
    }

    
    const course = await Course.findById(lesson.course);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // check owner 
    if (course.instructor.toString() !== req.user.id.toString()) {
      return res.status(403).json({ msg: "You are not the owner of this course" });
    }

    
    if (title) lesson.title = title;
    if (content !== undefined) lesson.content = content;

    // if there is new video
    if (req.file) {
      lesson.videoURL = req.file.path;
    }

    await lesson.save();

    res.status(200).json({
      msg: "Lesson updated successfully",
      lesson
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
};




// delete lesson


const deleteLesson = async (req, res) => {
  try {
    // 1. get lesson
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ msg: "Lesson not found" });
    }

    const course = req.course;

    // remove lesson from course
    course.lessons.pull(lesson._id);
    await course.save();

    // delete lesson
    await lesson.deleteOne();

    res.status(200).json({
      msg: "Lesson deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
};


module.exports = {
    addLesson,
    updateLesson,
    deleteLesson
};