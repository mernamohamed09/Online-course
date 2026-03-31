const Joi = require("joi");

// Validation for enrollment
const enrollSchema = Joi.object({
  courseId: Joi.string().required()
   
});

module.exports = { enrollSchema };