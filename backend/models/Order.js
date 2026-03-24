const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderItems: [
    {
      name: String,
      qty: Number,
      price: Number,
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    }
  ],
  totalPrice: Number,
  isPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model("Order", orderSchema);
