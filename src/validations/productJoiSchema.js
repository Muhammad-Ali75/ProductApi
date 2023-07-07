const Joi = require('joi');

const productJoiSchema = Joi.object({
  title: Joi.string().required(),
  moq: Joi.number().required(),
  image: Joi.string().required(),
  min_price: Joi.number().required(),
  max_price: Joi.number(),
  unit: Joi.string().required(),
  product_certificate: Joi.array().items(Joi.string()).required(),
  supplier_certificate: Joi.array().items(Joi.string()).required(),
  country: Joi.array().items(Joi.string()).required(),
  stock_in_usa: Joi.boolean().required(),
});

module.exports = productJoiSchema;
