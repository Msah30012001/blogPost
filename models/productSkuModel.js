const mongoose = require("mongoose");
const validator = require("validator");

const productSkuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "product sku is already present"],
  },
  slug: String,
  sku_code: {
    type: String,
    required: true,
  },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  thumbnail: { type: String, required: true },
  thumbnail_hover: String,
  image: [String],
  short_description: String,
  description: String,
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  discount_type: { type: Boolean, default: true },
  status: { type: Boolean, default: true },
  specification: {
    type: Map,
    of: [Map],
  },
  attribute: {
    type: Map,
    of: String,
  },
  featured: { type: Boolean, default: false },
  highlights: [String],
  view: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  user_id: mongoose.Schema.Types.ObjectId,
  user_type: String,
});

const ProductSku = new mongoose.model("ProductSku", productSkuSchema);

module.exports = ProductSku;
