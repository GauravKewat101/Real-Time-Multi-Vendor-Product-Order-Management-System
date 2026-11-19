const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  images:{
    type: [String],
    default: []
  },
  sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true 
  }
}, {timestamps:true});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;
