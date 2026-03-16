const Joi = require("joi");

// create course validation
const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
        
    description: Joi.string().min(10).required(),
        
    price: Joi.number().min(0).required(),  
});

// update course status validation
const updateStatusSchema = Joi.object({
    status: Joi.string().valid("Published", "Archived").required()
});

module.exports = {
    createCourseSchema,
    updateStatusSchema
};