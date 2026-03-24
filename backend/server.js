const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);


app.use(errorHandler);


mongoose.connect(process.env.DB)
  .then(() => console.log("MongoDB Connected "))
  .catch(err => console.log(err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
