const express = require("express");
const router = express.Router();
const Product = require("../model/product");
// const paginatedResults = require("../middleware/pagination");

//Get all Method
router.get("/getAllProducts", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const sort = req.query.sort || "";
  const query = req.query.query;
  console.log(query);

  const pagination = limit != -1;

  const options = {
    page,
    limit,
    pagination,
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
  const {
    title,
    moq,
    image,
    min_price,
    max_price,
    unit,
    product_certificate,
    supplier_certificate,
    country,
    stock_in_usa,
  } = req.body;

  // Create a new product object using the provided data
  const newProduct = new Product({
    title,
    moq,
    image,
    min_price,
    max_price,
    unit,
    product_certificate,
    supplier_certificate,
    country,
    stock_in_usa,
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
