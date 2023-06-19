require("dotenv").config();

const express = require("express");
const cors = require("cors");
const products = require("./routes/product");
const configureDatabase = require("./middleware/dbconnect")

configureDatabase();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", products);

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
