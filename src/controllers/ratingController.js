const Rating = require("../model/rating");

//Method to get all posts from db
async function getAll(req, res) {
  try {
    const ratings = await Rating.find();
    return res.json(ratings);
  } catch (error) {
    return res.status(400).json({ error: "No rating found" });
  }
}

//Method to post Product to db
async function postRating(req, res) {
  const { rating, product } = req.body;

  if (!rating || !product) {
    return res.status(400).json({ error: "All feilds must be present" });
  }
  //Create & Save the new rating to the database
  try {
    const result = await Rating.create({ rating, product });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  postRating,
};
