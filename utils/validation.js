const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  name: Joi.string().min(3).required(),
  birth_year: Joi.number().integer().min(1900).max(2021).required(),
});

module.exports = { authSchema };
