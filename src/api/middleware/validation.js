const Joi = require("joi");
const validator = require("../validator");
const { camelCase } = require("lodash");
exports.validate = (data, handler) => {
  let schema = `${camelCase(handler[0].replace("Controller", ""))}Validators`;

  if (validator[schema]) {
    let validationSchema = validator[schema][camelCase(handler[1])];

    const validateData = Joi.validate(data, validationSchema);

    if (validateData.error !== null)
      throw new Error(validateData.error.message);
  }
};
