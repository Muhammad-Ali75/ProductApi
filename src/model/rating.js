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
  const product = await Product.findById(doc.product).populate("ratings");
  product.ratings.push(doc);
  const length = product.ratings.length;
  const sum = product.ratings.reduce((acc, rating) => {
    return (acc += rating.rating);
  }, 0);
  product.rating = sum / length;
  await product.save();
});

module.exports = mongoose.model("Rating", ratingSchema);
