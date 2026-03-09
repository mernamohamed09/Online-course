const joi = require("joi");

//register

const registerSchema = joi.object({
  username: joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name must be at most 30 characters',
      'any.required': 'Name is required',
    }),

  email: joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),


  password: joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),

  role: joi.string()
    .valid('student', 'instructor', 'admin')
    .default('student')
    .messages({
      'any.only': 'Role must be student, instructor, or admin',
    }), 
});

//login

const loginSchema = joi.object({
  email: joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),

  password: joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

module.exports = {
    registerSchema,
    loginSchema
};