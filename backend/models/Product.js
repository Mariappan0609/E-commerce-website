const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
  unique: true,      
  lowercase: true,  
  trim: true         
},
price: {
  type: Number,
  required: true
},
  image: String,
  description: String,
  countInStock: Number
});

module.exports = mongoose.model("Product", productSchema);
