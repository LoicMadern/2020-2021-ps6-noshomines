const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  label: Joi.string().required(),
  isPictureAnswer: Joi.boolean().required(),
  quizId: Joi.number(),
  answers: Joi.array(),
})
