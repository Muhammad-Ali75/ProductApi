const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    moq: {
      required: true,
      type: Number,
    },
    image: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    min_price: { required: true, type: Number },
    max_price: { type: Number },
    unit: { required: true, type: String },
    product_certificate: { required: true, type: [String] },
    supplier_certificate: { required: true, type: [String] },
    country: { required: true, type: [String] },
    stock_in_usa: { type: Boolean },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product", productSchema);
