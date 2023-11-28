const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: [true, "attribute is already present"],
  },
  option: [
    {
      value: String,
      is_required: {type:Boolean,default:false},
      input_name: String,
    },
  ],
  user_id: mongoose.Schema.Types.ObjectId,
  user_type: String
});

const Attribute = new mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;
