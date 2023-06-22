const express = require("express");
const cors = require("cors");
const products = require("./src/routes/product");
const dbConnect = require("./src/middleware/dbConnect");

dbConnect();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", products);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
