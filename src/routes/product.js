const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const paginatedResults = require("../middleware/pagination");

//Get all Method
router.get("/getAllProducts", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = 3;
  const select = req.query.select || "";
  const sort = req.query.sort || "";
  const query = req.query.query;

  const pagination = limit != -1;

  const options = {
    page,
    limit,
    pagination,
    select,
    sort,
  };
  const results = await Product.paginate(JSON.parse(query || "{}"), options);

  return res.send({ ...results });
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
