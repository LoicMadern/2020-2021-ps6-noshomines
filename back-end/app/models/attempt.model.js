const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Attempt', {
  quizId: Joi.number().required(),
  userId: Joi.number().required(),
})
