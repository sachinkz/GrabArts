const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const successSchema = new Schema({
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
})

module.exports = mongoose.model("SuccessRpay", successSchema)
