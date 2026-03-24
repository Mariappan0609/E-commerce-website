const Product = require("../models/Product");


exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    let { name, price } = req.body;

    
    name = name.trim().toLowerCase();

    
    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    if (!price || isNaN(price)) {
      return res.status(400).json({ message: "Valid price is required" });
    }

    
    const existing = await Product.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (existing) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({
      name,
      price: Number(price)
    });

    const saved = await newProduct.save();

    return res.json(saved);

  } catch (err) {
    next(err);
  }
};
