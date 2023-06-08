const express = require("express");
const router = express.Router();
const Product = require("../model/product");

//Get all Method
router.get("/getAllProducts", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/product/:id", (req, res) => {
  res.send("Get by ID API");
});

router.post("/product", async (req, res) => {
  const { title, moq, lowerPriceRange, upperPriceRange, type, category } =
    req.body;

  // Create a new product object using the provided data
  const newProduct = new Product({
    title,
    moq,
    lowerPriceRange,
    upperPriceRange,
    type,
    category,
  });

  // Save the new product to the database
  try {
    const productToSave = await newProduct.save();
    res.status(200).json(productToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
