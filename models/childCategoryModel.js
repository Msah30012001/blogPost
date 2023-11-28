const mongoose = require("mongoose");

const childCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "child category is already present"],
  },
  sub_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  slug: {
    type: String,
  },
});

const ChildCategory = new mongoose.model("ChildCategory", childCategorySchema);

module.exports = ChildCategory;
