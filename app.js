require("dotenv").config();

const express = require("express");
const cors = require("cors");
const products = require("./routes/product");
const mongoose = require("mongoose");
const product = require("./model/product");
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", products);

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
