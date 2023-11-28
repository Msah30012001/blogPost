const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "specification is already present"],
  },
  list: [
    {
      type: Map,
      of: [String],
      required: true,
    },
  ],
  user_id: mongoose.Schema.Types.ObjectId,
  user_type: String
});

const Specification = new mongoose.model("Specification", specificationSchema);

module.exports = Specification;
