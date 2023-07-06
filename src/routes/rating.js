const express = require("express");
const router = express.Router();
const { getAll, postRating } = require("../controllers/ratingController");

//Get all Method
router.get("/", getAll);
//Post Product Method
router.post("/", postRating);

module.exports = router;
