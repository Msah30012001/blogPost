const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "main category is already present"],
  },
  slug: {
    type: String,
  },
});

const MainCategory = new mongoose.model("MainCategory", mainCategorySchema);

module.exports = MainCategory;
