const Product = require("../model/product");
const productValidations = require("../validations/productJoiSchema");

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
  } = req.body;

  const { error, value } = productValidations.validate({
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
  if (error) {
    res.status(400).json({ message: error.details });
  } else {
    try {
      const newProduct = await Product.create(value);
      res.status(200).json(newProduct);
    } catch (error) {
      console.log("Product Error::", error);
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = {
  getAll,
  postProduct,
};
