const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
      required: true,
    },
  },
  { timestamps: true }
);

ratingSchema.pre("validate", async function () {
  const Product = require("./product");
  const product = await Product.findById(this.product);
  if (!product) {
    throw new Error("Product does not exist");
  }
});

ratingSchema.post("save", async function (doc) {
  const Product = require("./product");
  const product = await Product.findById(doc.product);
  product.ratings.push(doc);
  await product.save();
});

module.exports = mongoose.model("Rating", ratingSchema);
