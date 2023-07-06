const Product = require("../model/product");

//Method to get all posts from db
async function getAll(req, res) {
  const { page = 1, limit = 5, sort = "", keyword, query } = req.query;
  const pagination = limit != -1;
  let searchquery;
  if (keyword) {
    searchquery = { title: { $regex: keyword, $options: "i" } };
  }

  const options = {
    page,
    limit,
    pagination,
    sort,
    populate: "ratings",
  };

  try {
    const results = await Product.paginate(
      searchquery || JSON.parse(query || "{}"),
      options
    );
    return res.send({ ...results });
  } catch (error) {
    console.error("Error parsing query:", error.message);
    return res.status(400).json({ error: "Invalid query" });
  }
}

//Method to post Product to db
async function postProduct(req, res) {
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
    rating,
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
    rating,
  });

  // Save the new product to the database
  try {
    const productToSave = await newProduct.save();
    res.status(200).json(productToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  postProduct,
};
