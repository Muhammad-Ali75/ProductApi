const express = require("express");
const { getAll, postProduct } = require("../controllers/productController");
const router = express.Router();
// const paginatedResults = require("../middleware/pagination");

router.get("/", (req, res) => {
  res.send("Product Api");
});

//Get all Method
router.get("/getAllProducts", getAll);
//Post Product Method
router.post("/product", postProduct);

module.exports = router;
