const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "product is already present"],
  },
  main_category_id: {type:mongoose.Schema.Types.ObjectId,required:true},
  sub_category_id: {type:mongoose.Schema.Types.ObjectId,required:true},
  child_category_id: mongoose.Schema.Types.ObjectId,
  description: String,
  brand: String,
  code: {
    type: String,
    required: true,
  },
  specification_id: mongoose.Schema.Types.ObjectId,
  attribute_id: mongoose.Schema.Types.ObjectId,
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

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
