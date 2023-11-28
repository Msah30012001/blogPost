const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "sub category is already present"],
  },
  main_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  slug: {
    type: String,
  },
});

const SubCategory = new mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
