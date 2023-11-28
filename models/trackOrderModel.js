const mongoose = require("mongoose");
const validator = require("validator");

const trackOrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  track: [
    {
        title:String,
        sub_title:String,
        details:[
            date:{type: Date,default:Date.now()},
            place:String,
            message:String
        ],
        status:{type:Boolean, default:false}
    },
  ],
});

const TrackOrder = new mongoose.model("TrackOrder", trackOrderSchema);

module.exports = Order;
