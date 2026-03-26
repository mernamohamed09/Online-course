const Joi = require("joi");

const createLessonSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.min": "Title must be at least 3 characters",
            "string.max": "Title must be at most 100 characters",
            "any.required": "Title is required"
        }),

    content: Joi.string()
        .allow("")
        .messages({
            "string.base": "Content must be a string"
        }),

    videoURL: Joi.string()
        .uri()
        .allow("")
        .messages({
            "string.uri": "Video must be a valid URL"
        })
})
.custom((value, helpers) => {
    // لازم يكون في content أو video
    if (!value.content && !value.videoURL) {
        return helpers.error("any.custom");
    }
    return value;
})
.messages({
    "any.custom": "You must provide either content or videoURL"
});

module.exports = {
    createLessonSchema
};