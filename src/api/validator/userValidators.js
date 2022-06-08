const Joi = require("joi");
const errorMessages = require("../constant/errorMessage");

exports.create = Joi.object().keys({
  email: Joi.string().error(new Error(errorMessages.NAME)).required(),
  name: Joi.string().error(new Error(errorMessages.NAME)).required(),
  password: Joi.string().error(new Error(errorMessages.NAME)).required(),
});
