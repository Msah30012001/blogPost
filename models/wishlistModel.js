const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  list: [
    {
      product_sku_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
      },
    },
  ],
});

const Wishlist = new mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
