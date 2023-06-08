const mongoose = require("mongoose");

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
  category: { required: true, type: String },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema);
