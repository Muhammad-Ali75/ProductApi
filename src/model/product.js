const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  moq: {
    required: true,
    type: Number,
  },
  lowerPriceRange: { required: true, type: Number },
  upperPriceRange: { required: false, type: Number },
  type: { required: true, type: String },
  category: { required: true, type: String }

}, { timestamps: true });

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product", productSchema);
