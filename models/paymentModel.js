const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
  },
  txn_id: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: [
      "COD",
      "EMI",
      "PAYTM",
      "RAZORPAY",
      "GPAY",
      "PHONEPAY",
      "UPI",
      "STRIPE",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "FAILED", "SUCCESS"],
    default: "PENDING",
    required: true,
  },
});

const Payment = new mongoose.model("Payment", paymentSchema);

module.exports = Payment;
