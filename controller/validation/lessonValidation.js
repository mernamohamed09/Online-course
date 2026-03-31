const Joi = require("joi");


const createLessonSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),

    content: Joi.string().min(10).required()
});



const updateLessonSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().allow(""),
});

module.exports = {
    createLessonSchema,
     updateLessonSchema
};