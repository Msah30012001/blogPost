const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  list: [
    {
      product_sku_id: { type: mongoose.Schema.Types.ObjectId,unique:true, required: true },
      qty: { type: Number, default: 1 },
    },
  ],
});

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;
