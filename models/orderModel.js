const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: [
    {
      product_sku_id: mongoose.Schema.Types.ObjectId,
      qty: Number,
      price: Number,
      discount: Number,
      discount_type: Boolean,
    },
  ],
  shipping: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  billing: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
