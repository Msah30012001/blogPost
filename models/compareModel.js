const mongoose = require("mongoose");

const compareSchema = new mongoose.Schema({
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

const Compare = new mongoose.model("Compare", compareSchema);

module.exports = Compare;
