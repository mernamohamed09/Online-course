const addLesson = async (req, res) => {
    try {
        const { title, content } = req.body;
        const course = req.course; // الكورس جاي من middleware

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
        res.status(500).json({ msg: err.message });
    }
};