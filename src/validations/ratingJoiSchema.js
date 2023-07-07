const Joi = require("joi");

const ratingJoiSchema = Joi.object({
  rating: Joi.number().min(0).max(5).required(),
  product: Joi.string().alphanum().length(24).required(), // Assuming the product ID is a MongoDB ObjectID
});

module.exports = ratingJoiSchema;
